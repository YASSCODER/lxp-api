import { Module } from '@nestjs/common'
import { BadgeService } from './api/badge.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Badge } from '@/common/models/entities/badge.entity'
import { BadgeLearnerLink } from '@/common/models/entities/badge-learner-link.entity'
import { Learner } from '@/common/models/entities/learner.entity'
import { UserLogService } from '../user-log/api/user-log.service'
import { PaginationService } from '@/common/pagination/pagination.service'
import { UserLog } from '@/common/models/entities/user-log.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Badge, BadgeLearnerLink, Learner, UserLog]),
  ],
  providers: [BadgeService, UserLogService, PaginationService, UserLogService],
})
export class BadgeModule {}
