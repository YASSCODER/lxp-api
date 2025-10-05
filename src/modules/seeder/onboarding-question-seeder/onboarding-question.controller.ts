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
    const count =
      await this.onboardingQuestionSeederService.getSeededQuestionsCount()

    return {
      message: 'Onboarding questions seeded successfully',
      count,
    }
  }

  @Delete('clear')
  async clearOnboardingQuestions() {
    await this.onboardingQuestionSeederService.clearOnboardingQuestions()

    return {
      message: 'All onboarding questions cleared successfully',
    }
  }

  @Get('count')
  async getOnboardingQuestionsCount() {
    const count =
      await this.onboardingQuestionSeederService.getSeededQuestionsCount()

    return {
      message: 'Onboarding questions count retrieved',
      count,
    }
  }
}
