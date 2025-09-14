import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { Course } from './course.entity'
import { LearnerCourseLinker } from './learner-course-linker.entity'
import { JoinColumn } from 'typeorm'
import { Module } from './module.entity'
import { LearnerLearnPath } from './learner-learn-path-link.entity'

// Type alias to avoid circular import
type LearnerLearnPathType =
  import('./learner-learn-path-link.entity').LearnerLearnPath

@Entity('learn_path')
export class LearnPath extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'integer', nullable: false })
  moduleId: number

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'varchar', nullable: false })
  hourToComplete: string

  @OneToMany(() => Course, (c) => c.learnPath)
  courses: Course[]

  @ManyToOne(() => Module, (module) => module.learnPaths)
  @JoinColumn({ name: 'moduleId' })
  module: Module

  @OneToMany(() => LearnerLearnPath, (llp) => llp.learner)
  learnerLinks: LearnerLearnPathType[]
}
