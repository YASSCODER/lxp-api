import { Role } from '@/common/models/entities/role.entity'
import { User } from '@/common/models/entities/user.entity'
import { OnboardingQuestion } from '@/common/models/entities/onboarding-question.entity'
import { OnboardingAnswer } from '@/common/models/entities/onboarding-answer.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleServiceSeeder } from './role/role.service'
import { RoleControllerSeeder } from './role/role.controller'
import { UserServiceSeeder } from './user/user.service'
import { UserControllerSeeder } from './user/user.controller'
import { OnboardingQuestionSeederService } from './onboarding-question-seeder/onboarding-question.service'
import { OnboardingQuestionSeederController } from './onboarding-question-seeder/onboarding-question.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      User,
      OnboardingQuestion,
      OnboardingAnswer,
    ]),
  ],
  providers: [
    RoleServiceSeeder,
    UserServiceSeeder,
    OnboardingQuestionSeederService,
  ],
  controllers: [
    RoleControllerSeeder,
    UserControllerSeeder,
    OnboardingQuestionSeederController,
  ],
})
export class SeederModule {}
