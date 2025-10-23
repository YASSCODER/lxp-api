import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OnboardingQuestion } from '@/common/models/entities/onboarding-question.entity'
import { OnboardingAnswer } from '@/common/models/entities/onboarding-answer.entity'
import { UserAnswerOnboarding } from '@/common/models/entities/user-answer-onboarding.entity'
import { QuestionType, QuestionEnum } from '@/common/enum/question.enum'
import { Answers, AnswerEnum } from '@/common/enum/answers.enum'
import { QuestionTextEmbedded } from '@/common/models/embedded/question-text.embedded'
import { AnswerTextEmbedded } from '@/common/models/embedded/answer-text.embedded'

@Injectable()
export class OnboardingQuestionSeederService {
  constructor(
    @InjectRepository(OnboardingQuestion)
    private readonly onboardingQuestionRepository: Repository<OnboardingQuestion>,
    @InjectRepository(OnboardingAnswer)
    private readonly onboardingAnswerRepository: Repository<OnboardingAnswer>,
    @InjectRepository(UserAnswerOnboarding)
    private readonly userAnswerOnboardingRepository: Repository<UserAnswerOnboarding>,
  ) {}

  private readonly logger = new Logger('OnboardingQuestionSeederService')

  async deleteAllQuestionsAndAnswersByAnswerKey() {
    try {
      const QuestionKeysToKeep = [
        QuestionEnum.Q_PRIMARY_FUNCTIONALITY,
        QuestionEnum.Q_SENIORITY_LEVEL,
        QuestionEnum.Q_TARGET_TRACK,
        QuestionEnum.Q_PRIMARY_GOAL,
        QuestionEnum.Q_SUCCESS_METRIC,
        QuestionEnum.Q_WEEKLY_TIME_BUDGET,
      ]
      const QuestionKeysToDelete = Object.keys(QuestionType).filter(
        (questionKey) =>
          !QuestionKeysToKeep.includes(QuestionEnum[questionKey]),
      )

      this.logger.log(
        `The following questions and answers will be kept: ${QuestionKeysToKeep}`,
      )

      this.logger.log(
        `The following questions and answers will be deleted: ${QuestionKeysToDelete}`,
      )

      for (const questionKey of QuestionKeysToDelete) {
        this.logger.log(`Deleting question ${questionKey}`)
        const question = await this.onboardingQuestionRepository.findOne({
          where: {
            question: QuestionEnum[questionKey],
          },
        })

        this.logger.log(
          `Question found: ${question ? question.question : 'null'}`,
        )

        if (question) {
          await this.userAnswerOnboardingRepository.delete({
            onboardingQuestionId: question.id,
          })
          this.logger.log(
            `Deleted user answers for question ${question.question}`,
          )

          await this.onboardingAnswerRepository.delete({
            onboardingQuestionId: question.id,
          })
          this.logger.log(`Deleted answers for question ${question.question}`)

          await this.onboardingQuestionRepository.delete(question.id)
          this.logger.log(`Deleted question ${question.question}`)
        } else {
          this.logger.warn(`Question not found: ${questionKey}`)
        }
      }

      this.logger.log('All questions and answers deleted successfully')
    } catch (error) {
      this.logger.error(
        'Failed to delete all questions and answers by answer key',
        error.stack,
      )
    }
  }

  async seedOnboardingQuestions() {
    this.logger.log('Starting onboarding questions and answers seeding...')

    const questionKeys = Object.keys(QuestionType) as Array<
      keyof typeof QuestionType
    >

    for (const questionKey of questionKeys) {
      const questionData = QuestionType[questionKey]
      const questionEnumValue = QuestionEnum[questionKey]

      const existingQuestion = await this.onboardingQuestionRepository
        .createQueryBuilder('question')
        .where('question.question = :questionEnum', {
          questionEnum: questionEnumValue,
        })
        .getOne()

      let question: OnboardingQuestion

      if (existingQuestion) {
        this.logger.debug(`Question already exists: ${questionData.key}`)
        question = existingQuestion
      } else {
        const onboardingQuestion = this.onboardingQuestionRepository.create({
          question: questionEnumValue,
          questionText: {
            en: questionData.text.en,
            ar: questionData.text.ar,
          } as QuestionTextEmbedded,
        })

        try {
          question =
            await this.onboardingQuestionRepository.save(onboardingQuestion)
          this.logger.log(`Created onboarding question: ${questionData.key}`)
        } catch (error) {
          this.logger.error(
            `Failed to create onboarding question: ${questionData.key}`,
            error.stack,
          )
          continue
        }
      }

      await this.seedAnswersForQuestion(question, questionData.key)
    }

    this.logger.log('Onboarding questions and answers seeding completed')
  }

  private async seedAnswersForQuestion(
    question: OnboardingQuestion,
    questionKey: string,
  ) {
    const answerKey = Object.keys(Answers).find(
      (answerKey) =>
        Answers[answerKey as keyof typeof Answers].key === questionKey,
    ) as keyof typeof Answers

    if (!answerKey) {
      this.logger.warn(
        `No matching answer options found for question: ${questionKey}`,
      )
      return
    }

    const answerOptions = Answers[answerKey].options

    for (const option of answerOptions) {
      let answerText: AnswerTextEmbedded
      let scale: number | null = null

      if ('text' in option && 'scale' in option) {
        answerText = {
          en: option.text.en,
          ar: option.text.ar,
        } as AnswerTextEmbedded
        scale = option.scale
      } else {
        answerText = {
          en: option.en,
          ar: option.ar,
        } as AnswerTextEmbedded
      }

      const existingAnswers = await this.onboardingAnswerRepository.find({
        where: { onboardingQuestionId: question.id },
      })

      const existingAnswer = existingAnswers.find(
        (existing) =>
          existing.answerText.en === answerText.en &&
          existing.answerText.ar === answerText.ar,
      )

      if (existingAnswer) {
        this.logger.debug(
          `Answer already exists for question ${questionKey}: ${JSON.stringify(answerText)}`,
        )
        continue
      }

      const onboardingAnswer = this.onboardingAnswerRepository.create({
        answerKey: AnswerEnum[answerKey],
        onboardingQuestionId: question.id,
        answerText,
        scale,
      })

      try {
        await this.onboardingAnswerRepository.save(onboardingAnswer)
        this.logger.log(
          `Created answer for question ${questionKey}: ${JSON.stringify(answerText)}`,
        )
      } catch (error) {
        this.logger.error(
          `Failed to create answer for question ${questionKey}`,
          error.stack,
        )
      }
    }
  }

  async clearOnboardingQuestions() {
    this.logger.log('Clearing all onboarding questions and answers...')

    try {
      await this.onboardingAnswerRepository.clear()
      this.logger.log('All onboarding answers cleared successfully')

      await this.onboardingQuestionRepository.clear()
      this.logger.log('All onboarding questions cleared successfully')
    } catch (error) {
      this.logger.error(
        'Failed to clear onboarding questions and answers',
        error.stack,
      )
    }
  }

  async getSeededQuestionsCount(): Promise<number> {
    return await this.onboardingQuestionRepository.count()
  }

  async getSeededAnswersCount(): Promise<number> {
    return await this.onboardingAnswerRepository.count()
  }

  async getSeededDataCount() {
    const questionsCount = await this.getSeededQuestionsCount()
    const answersCount = await this.getSeededAnswersCount()

    return {
      questions: questionsCount,
      answers: answersCount,
    }
  }
}
