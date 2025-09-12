import { Module } from '@nestjs/common'
import { BadgeService } from './api/badge.service'
import { BadgeController } from './api/badge.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Badge } from '@/common/models/entities/badge.entity'
import { BadgeLearnerLink } from '@/common/models/entities/badge-learner-link.entity'
import { Learner } from '@/common/models/entities/learner.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Badge, BadgeLearnerLink, Learner])],
  providers: [BadgeService],
  controllers: [BadgeController],
})
export class BadgeModule {}
