import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OnboardingAnswer } from '@/common/models/entities/onboarding-answer.entity'
import { OnboardingQuestion } from '@/common/models/entities/onboarding-question.entity'
import { QuestionType, QuestionEnum } from '@/common/enum/question.enum'
import { Answers, AnswerEnum } from '@/common/enum/answers.enum'
import { AnswerTextEmbedded } from '@/common/models/embedded/answer-text.embedded'

@Injectable()
export class OnboardingAnswerSeederService {
  constructor(
    @InjectRepository(OnboardingAnswer)
    private readonly onboardingAnswerRepository: Repository<OnboardingAnswer>,
    @InjectRepository(OnboardingQuestion)
    private readonly onboardingQuestionRepository: Repository<OnboardingQuestion>,
  ) {}

  private readonly logger = new Logger('OnboardingAnswerSeederService')

  async seedOnboardingAnswers() {
    this.logger.log('Starting onboarding answers seeding...')

    const questions = await this.onboardingQuestionRepository.find()

    for (const question of questions) {
      const answerKey = Object.keys(Answers).find(
        (answerKey) =>
          Answers[answerKey as keyof typeof Answers].key === question.question,
      ) as keyof typeof Answers

      if (!answerKey) {
        this.logger.warn(
          `No matching answer options found for question: ${question.question}`,
        )
        continue
      }

      const answerOptions = Answers[answerKey].options

      for (const option of answerOptions) {
        const existingAnswer = await this.onboardingAnswerRepository
          .createQueryBuilder('answer')
          .where('answer.onboardingQuestionId = :questionId', {
            questionId: question.id,
          })
          .andWhere('answer.answerText = :answerText', {
            answerText: JSON.stringify(option),
          })
          .getOne()

        if (existingAnswer) {
          this.logger.debug(
            `Answer already exists for question ${question.question}: ${JSON.stringify(option)}`,
          )
          continue
        }

        let answerText: string
        let scale: number | null = null

        if ('text' in option && 'scale' in option) {
          answerText = JSON.stringify(option.text)
          scale = option.scale
        } else {
          answerText = JSON.stringify(option)
        }

        const onboardingAnswer = this.onboardingAnswerRepository.create({
          answerKey: AnswerEnum[answerKey],
          onboardingQuestionId: question.id,
          answerText: JSON.parse(answerText) as AnswerTextEmbedded,
          scale,
        })

        try {
          await this.onboardingAnswerRepository.save(onboardingAnswer)
          this.logger.log(
            `Created answer for question ${question.question}: ${answerText}`,
          )
        } catch (error) {
          this.logger.error(
            `Failed to create answer for question ${question.question}`,
            error.stack,
          )
        }
      }
    }

    this.logger.log('Onboarding answers seeding completed')
  }

  async clearOnboardingAnswers() {
    this.logger.log('Clearing all onboarding answers...')

    try {
      await this.onboardingAnswerRepository.clear()
      this.logger.log('All onboarding answers cleared successfully')
    } catch (error) {
      this.logger.error('Failed to clear onboarding answers', error.stack)
    }
  }

  async getSeededAnswersCount(): Promise<number> {
    return await this.onboardingAnswerRepository.count()
  }
}
