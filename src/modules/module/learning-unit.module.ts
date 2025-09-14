import { LearnerModuleLinker } from '@/common/models/entities/learner-module-link.entity'
import { LearningUnit } from '@/common/models/entities/module.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LearningUnitController } from './api/learning-unit.controller'
import { LearningUnitService } from './api/learning-unit.service'

@Module({
  imports: [TypeOrmModule.forFeature([LearningUnit, LearnerModuleLinker])],
  providers: [LearningUnitService],
  controllers: [LearningUnitController],
  exports: [],
})
export class LearningUnitModule {}
