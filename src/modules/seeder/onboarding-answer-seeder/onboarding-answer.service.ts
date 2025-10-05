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

    // Get all questions from the database
    const questions = await this.onboardingQuestionRepository.find()

    for (const question of questions) {
      // Find the corresponding answer options from the enum
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

      // Create individual answer records for each option
      for (const option of answerOptions) {
        // Check if this answer already exists
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

        // Handle different option formats
        let answerText: string
        let scale: number | null = null

        // Check if option has 'text' and 'scale' properties (scale-based options)
        if ('text' in option && 'scale' in option) {
          // Scale-based option (like A_BASE_LINE_LEVEL)
          answerText = JSON.stringify(option.text)
          scale = option.scale
        } else {
          // Simple text option (like A_ROLE_FUNCTION)
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
