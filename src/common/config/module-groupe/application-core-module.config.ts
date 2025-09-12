import { AuthModule } from '@/auth/auth.module'
import { SeederModule } from '@/modules/seeder/seeder.module'
import { SkillModule } from '@/modules/skills/skill.module'

export const ApplicationCoreModule = [AuthModule, SkillModule, SeederModule]
