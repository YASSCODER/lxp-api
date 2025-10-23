import { Controller, Post, Delete, Get, Body } from '@nestjs/common'
import { OnboardingQuestionSeederService } from './onboarding-question.service'
import { AnswerEnum } from '@/common/enum/answers.enum'

@Controller('seeder/onboarding-questions')
export class OnboardingQuestionSeederController {
  constructor(
    private readonly onboardingQuestionSeederService: OnboardingQuestionSeederService,
  ) {}

  @Post('seed')
  async seedOnboardingQuestions() {
    await this.onboardingQuestionSeederService.seedOnboardingQuestions()
    const counts =
      await this.onboardingQuestionSeederService.getSeededDataCount()

    return {
      message: 'Onboarding questions and answers seeded successfully',
      counts,
    }
  }

  @Delete('delete-by-answer-key')
  async deleteAllQuestionsAndAnswersByAnswerKey() {
    await this.onboardingQuestionSeederService.deleteAllQuestionsAndAnswersByAnswerKey()

    return {
      message: 'All questions and answers deleted successfully',
    }
  }

  @Delete('clear')
  async clearOnboardingQuestions() {
    await this.onboardingQuestionSeederService.clearOnboardingQuestions()

    return {
      message: 'All onboarding questions and answers cleared successfully',
    }
  }

  @Get('count')
  async getOnboardingQuestionsCount() {
    const counts =
      await this.onboardingQuestionSeederService.getSeededDataCount()

    return {
      message: 'Onboarding questions and answers count retrieved',
      counts,
    }
  }
}
