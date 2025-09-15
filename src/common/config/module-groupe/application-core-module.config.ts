import { AuthModule } from '@/auth/auth.module'
import { BadgeModule } from '@/modules/badge/badge.module'
import { SeederModule } from '@/modules/seeder/seeder.module'
import { SkillModule } from '@/modules/skills/skill.module'
import { AWSModule } from '@/common/aws/aws.module'
import { LearningUnitModule } from '@/modules/module/learning-unit.module'
import { LearnPathModule } from '@/modules/learn-path/learn-path.module'
import { CourseModule } from '@/modules/course/course.module'

export const ApplicationCoreModule = [
  AuthModule,
  SkillModule,
  SeederModule,
  BadgeModule,
  LearningUnitModule,
  LearnPathModule,
  CourseModule,
  AWSModule,
]
