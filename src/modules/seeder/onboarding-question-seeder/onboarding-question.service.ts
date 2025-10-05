import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OnboardingQuestion } from '@/common/models/entities/onboarding-question.entity'
import { QuestionType, QuestionEnum } from '@/common/enum/question.enum'
import { Answers, AnswerEnum } from '@/common/enum/answers.enum'
import { AnswersOption } from '@/common/models/embedded/answers-option.embedded'
import { QuestionTextEmbedded } from '@/common/models/embedded/question-text.embedded'

@Injectable()
export class OnboardingQuestionSeederService {
  constructor(
    @InjectRepository(OnboardingQuestion)
    private readonly onboardingQuestionRepository: Repository<OnboardingQuestion>,
  ) {}

  private readonly logger = new Logger('OnboardingQuestionSeederService')

  private transformAnswerOptions(options: any[]): AnswersOption[] {
    return options.map((option) => {
      if (option.text && option.scale !== undefined) {
        return {
          text: option.text,
          scale: option.scale,
        }
      }
      return {
        text: option,
        scale: null,
      }
    })
  }

  async seedOnboardingQuestions() {
    this.logger.log('Starting onboarding questions seeding...')

    const questionKeys = Object.keys(QuestionType) as Array<
      keyof typeof QuestionType
    >

    for (const questionKey of questionKeys) {
      const questionData = QuestionType[questionKey]
      const questionEnumValue = QuestionEnum[questionKey]

      const answerKey = Object.keys(Answers).find(
        (answerKey) =>
          Answers[answerKey as keyof typeof Answers].key === questionData.key,
      ) as keyof typeof Answers

      if (!answerKey) {
        this.logger.warn(
          `No matching answer found for question: ${questionData.key}`,
        )
        continue
      }

      const answerEnumValue = AnswerEnum[answerKey]

      const existingQuestion = await this.onboardingQuestionRepository
        .createQueryBuilder('question')
        .where('question.question = :questionEnum', {
          questionEnum: questionEnumValue,
        })
        .andWhere('question.answer = :answerEnum', {
          answerEnum: answerEnumValue,
        })
        .getOne()

      if (existingQuestion) {
        this.logger.debug(
          `Question-answer pair already exists: ${questionData.key} -> ${Answers[answerKey].key}`,
        )
        continue
      }

      const onboardingQuestion = this.onboardingQuestionRepository.create({
        question: questionEnumValue,
        answer: answerEnumValue,
        questionText: {
          en: questionData.text.en,
          ar: questionData.text.ar,
        } as QuestionTextEmbedded,
        answerOptions: this.transformAnswerOptions([
          ...Answers[answerKey].options,
        ]),
      })

      try {
        await this.onboardingQuestionRepository.save(onboardingQuestion)
        this.logger.log(
          `Created onboarding question: ${questionData.key} -> ${Answers[answerKey].key} with ${Answers[answerKey].options.length} options`,
        )
      } catch (error) {
        this.logger.error(
          `Failed to create onboarding question: ${questionData.key}`,
          error.stack,
        )
      }
    }

    this.logger.log('Onboarding questions seeding completed')
  }

  async clearOnboardingQuestions() {
    this.logger.log('Clearing all onboarding questions...')

    try {
      await this.onboardingQuestionRepository.clear()
      this.logger.log('All onboarding questions cleared successfully')
    } catch (error) {
      this.logger.error('Failed to clear onboarding questions', error.stack)
    }
  }

  async getSeededQuestionsCount(): Promise<number> {
    return await this.onboardingQuestionRepository.count()
  }
}
