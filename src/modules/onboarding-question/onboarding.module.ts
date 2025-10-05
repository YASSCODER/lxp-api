import { OnboardingQuestion } from '@/common/models/entities/onboarding-question.entity'
import { OnboardingAnswer } from '@/common/models/entities/onboarding-answer.entity'
import { UserAnswerOnboarding } from '@/common/models/entities/user-answer-onboarding.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OnboardingController } from './api/onboarding.controller'
import { OnboardingService } from './api/onboarding.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OnboardingQuestion,
      OnboardingAnswer,
      UserAnswerOnboarding,
    ]),
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule {}
