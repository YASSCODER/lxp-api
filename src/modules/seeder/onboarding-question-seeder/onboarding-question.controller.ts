import { Controller, Post, Delete, Get } from '@nestjs/common'
import { OnboardingQuestionSeederService } from './onboarding-question.service'

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
