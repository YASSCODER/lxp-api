import { Controller, Post, Delete, Get } from '@nestjs/common'
import { OnboardingAnswerSeederService } from './onboarding-answer.service'

@Controller('seeder/onboarding-answers')
export class OnboardingAnswerSeederController {
  constructor(
    private readonly onboardingAnswerSeederService: OnboardingAnswerSeederService,
  ) {}

  @Post('seed')
  async seedOnboardingAnswers() {
    await this.onboardingAnswerSeederService.seedOnboardingAnswers()
    const count =
      await this.onboardingAnswerSeederService.getSeededAnswersCount()

    return {
      message: 'Onboarding answers seeded successfully',
      count,
    }
  }

  @Delete('clear')
  async clearOnboardingAnswers() {
    await this.onboardingAnswerSeederService.clearOnboardingAnswers()

    return {
      message: 'All onboarding answers cleared successfully',
    }
  }

  @Get('count')
  async getOnboardingAnswersCount() {
    const count =
      await this.onboardingAnswerSeederService.getSeededAnswersCount()

    return {
      message: 'Onboarding answers count retrieved',
      count,
    }
  }
}
