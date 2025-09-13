import { Entity, ManyToOne, Column } from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { Learner } from './learner.entity'
import { Module } from './module.entity'

@Entity('learner_module_linker')
export class LearnerModuleLinker extends BaseModel {
  @ManyToOne(() => Learner, (learner) => learner.moduleLinks)
  learner: Learner

  @ManyToOne(() => Module, (module) => module.learnerLinks)
  module: Module

  @Column({ type: 'boolean', default: false })
  completed: boolean

  @Column({ type: 'float', default: 0 })
  progress: number

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date

  @Column({ type: 'integer', nullable: false })
  learnerId: number

  @Column({ type: 'integer', nullable: false })
  moduleId: number
}
