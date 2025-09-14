import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'

import { Learner } from './learner.entity'
import { Course } from './course.entity'
import { LearnPath } from './learn-path.entity'

@Entity('learner_course_linker')
export class LearnerCourseLinker extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Index('idx_lcl_learner')
  @Column({ type: 'integer', nullable: false })
  learnerId: number

  @Index('idx_lcl_course')
  @Column({ type: 'number', nullable: false })
  courseId: number

  @Column({ type: 'boolean', default: false })
  completed: boolean

  @Column({ type: 'float', default: 0 })
  progress: number

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date

  @ManyToOne(() => Learner, (learner) => learner.courseLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'learnerId' })
  learner: Learner

  @ManyToOne(() => Course, (course) => course.learnerLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course: Course
}
