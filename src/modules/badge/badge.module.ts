import { Module } from '@nestjs/common'
import { BadgeService } from './api/badge.service'
import { BadgeController } from './api/badge.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Badge } from '@/common/models/entities/badge.entity'
import { BadgeLearnerLink } from '@/common/models/entities/badge-learner-link.entity'
import { Learner } from '@/common/models/entities/learner.entity'
import { UserLogService } from '../user-log/api/user-log.service'
import { PaginationService } from '@/common/pagination/pagination.service'

@Module({
  imports: [TypeOrmModule.forFeature([Badge, BadgeLearnerLink, Learner])],
  providers: [BadgeService, UserLogService, PaginationService, UserLogService],
  controllers: [BadgeController],
})
export class BadgeModule {}
