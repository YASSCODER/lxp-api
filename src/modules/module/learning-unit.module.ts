import { LearnerModuleLinker } from '@/common/models/entities/learner-module-link.entity'
import { LearningUnit } from '@/common/models/entities/module.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LearningUnitController } from './api/learning-unit.controller'
import { LearningUnitService } from './api/learning-unit.service'
import { UserLogService } from '../user-log/api/user-log.service'
import { UserLog } from '@/common/models/entities/user-log.entity'
import { PaginationService } from '@/common/pagination/pagination.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([LearningUnit, LearnerModuleLinker, UserLog]),
  ],
  providers: [LearningUnitService, UserLogService, PaginationService],
  controllers: [LearningUnitController],
  exports: [],
})
export class LearningUnitModule {}
