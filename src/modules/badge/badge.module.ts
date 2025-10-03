import { Module } from '@nestjs/common'
import { BadgeService } from './api/badge.service'
import { BadgeController } from './api/badge.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Badge } from '@/common/models/entities/badge.entity'
import { BadgeLearnerLink } from '@/common/models/entities/badge-learner-link.entity'
import { Learner } from '@/common/models/entities/learner.entity'
import { UserLogService } from '../user-log/api/user-log.service'
import { PaginationService } from '@/common/pagination/pagination.service'
<<<<<<< HEAD
import { UserLog } from '@/common/models/entities/user-log.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Badge, BadgeLearnerLink, Learner, UserLog]),
  ],
=======

@Module({
  imports: [TypeOrmModule.forFeature([Badge, BadgeLearnerLink, Learner])],
>>>>>>> 8fc49efc3e94d77479c18227aea8478e21b94034
  providers: [BadgeService, UserLogService, PaginationService, UserLogService],
  controllers: [BadgeController],
})
export class BadgeModule {}
