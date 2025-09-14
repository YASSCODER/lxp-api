import { LearnerModuleLinker } from '@/common/models/entities/learner-module-link.entity'
import { LearningUnit } from '@/common/models/entities/module.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([LearningUnit, LearnerModuleLinker])],
  providers: [],
  exports: [],
})
export class ModuleModule {}
