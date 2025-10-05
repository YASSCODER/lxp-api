import { OnboardingQuestion } from '@/common/models/entities/onboarding-question.entity'
import { OnboardingAnswer } from '@/common/models/entities/onboarding-answer.entity'
import { UserAnswerOnboarding } from '@/common/models/entities/user-answer-onboarding.entity'
import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { paginationParamsFormula } from '@/common/utils/pagination-formula.utils'
import { PaginationDto } from '@/common/dto/pagination.dto'
import {
  PaginationResult,
  PaginationService,
} from '@/common/pagination/pagination.service'
import { CreateUserAnswerOnboardingDto } from '../dto/create-user-answer.dto'
import { getCreateSuccessMessage } from '@/common/utils/success-messages.utils'

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(OnboardingQuestion)
    private readonly onboardingQuestionRepository: Repository<OnboardingQuestion>,
    @InjectRepository(OnboardingAnswer)
    private readonly onboardingAnswerRepository: Repository<OnboardingAnswer>,
    @InjectRepository(UserAnswerOnboarding)
    private readonly userAnswerOnboardingRepository: Repository<UserAnswerOnboarding>,
    private readonly paginationService: PaginationService,
  ) {}

  async getOnboardingQuestionsWithAnswers(
    query: PaginationDto,
  ): Promise<PaginationResult<DeepPartial<OnboardingQuestion>>> {
    const paginationParams = paginationParamsFormula(query)
    const qb = this.onboardingQuestionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.onboardingAnswers', 'answer')

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = data.map((question) => {
      const answers = question.onboardingAnswers.map((answer) => {
        return {
          id: answer.id,
          answer: answer.answerText,
          scale: answer.scale,
        }
      })
      return {
        id: question.id,
        question: question.question,
        answers,
      }
    })

    return {
      data: mappedData,
      pagination,
    }
  }

  async getAvailableAnswersForQuestion(questionId: number) {
    return this.onboardingAnswerRepository.find({
      where: { onboardingQuestionId: questionId },
    })
  }

  async chooseAnswerAsUser(
    userId: number,
    payload: CreateUserAnswerOnboardingDto,
  ) {
    const existingAnswer = await this.userAnswerOnboardingRepository.findOne({
      where: {
        userId,
        onboardingQuestionId: payload.onboardingQuestionId,
      },
    })

    if (existingAnswer) {
      throw new BadRequestException('User has already answered this question')
    }

    const answer = await this.onboardingAnswerRepository.findOne({
      where: {
        id: payload.onboardingAnswerId,
        onboardingQuestionId: payload.onboardingQuestionId,
      },
    })

    if (!answer) {
      throw new BadRequestException('Invalid answer for this question')
    }

    const userAnswerOnboarding = this.userAnswerOnboardingRepository.create({
      userId,
      onboardingQuestionId: payload.onboardingQuestionId,
      onboardingAnswerId: payload.onboardingAnswerId,
    })

    await this.userAnswerOnboardingRepository.save(userAnswerOnboarding)

    return getCreateSuccessMessage({
      entityName: 'UserAnswerOnboarding',
      entityId: userAnswerOnboarding.id,
    })
  }

  async getUserAnswers(
    userId: number,
    query: PaginationDto,
  ): Promise<PaginationResult<DeepPartial<UserAnswerOnboarding>>> {
    const paginationParams = paginationParamsFormula(query)
    const qb = this.userAnswerOnboardingRepository
      .createQueryBuilder('userAnswerOnboarding')
      .innerJoinAndSelect(
        'userAnswerOnboarding.onboardingQuestion',
        'onboardingQuestion',
      )
      .innerJoinAndSelect(
        'userAnswerOnboarding.onboardingAnswer',
        'onboardingAnswer',
      )
      .where('userAnswerOnboarding.userId = :userId', { userId })

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = data.map((userAnswerOnboarding) => {
      return {
        id: userAnswerOnboarding.id,
        onboardingQuestion: {
          id: userAnswerOnboarding.onboardingQuestion.id,
          question: userAnswerOnboarding.onboardingQuestion.question,
          questionText: userAnswerOnboarding.onboardingQuestion.questionText,
        },
        onboardingAnswer: {
          id: userAnswerOnboarding.onboardingAnswer.id,
          answer: userAnswerOnboarding.onboardingAnswer.answerText,
        },
      }
    })

    return {
      data: mappedData,
      pagination,
    }
  }
}
