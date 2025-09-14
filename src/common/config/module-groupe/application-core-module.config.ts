import { AuthModule } from '@/auth/auth.module'
import { BadgeModule } from '@/modules/badge/badge.module'
import { SeederModule } from '@/modules/seeder/seeder.module'
import { SkillModule } from '@/modules/skills/skill.module'
import { AWSModule } from '@/common/aws/aws.module'

export const ApplicationCoreModule = [
  AuthModule,
  SkillModule,
  SeederModule,
  BadgeModule,
  AWSModule,
]
