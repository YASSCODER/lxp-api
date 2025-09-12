import { Skill } from '@/common/models/entities/skills.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillService } from './api/skill.service'
import { SkillController } from './api/skill.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillService],
  controllers: [SkillController],
})
export class SkillModule {}
