import { Learner } from '@/common/models/entities/learner.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LearnerController } from './api/learner.controller'
import { LearnerService } from './api/learner.service'
import { PaginationService } from '@/common/pagination/pagination.service'

@Module({
  imports: [TypeOrmModule.forFeature([Learner])],
  providers: [LearnerService, PaginationService],
  controllers: [LearnerController],
})
export class LearnerModule {}
