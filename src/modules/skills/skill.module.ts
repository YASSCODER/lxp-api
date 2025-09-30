import { Skill } from '@/common/models/entities/skills.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillService } from './api/skill.service'
import { SkillController } from './api/skill.controller'
import { PaginationService } from '@/common/pagination/pagination.service'
import { S3Service } from '@/common/aws/service/s3.service'
import { LearnerSkillLinker } from '@/common/models/entities/learner-skill-linker.entity'

import { User } from '@/common/models/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Skill, User, LearnerSkillLinker])],

  providers: [SkillService, PaginationService, S3Service],
  controllers: [SkillController],
})
export class SkillModule {}
