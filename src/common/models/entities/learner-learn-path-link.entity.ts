import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { Learner } from './learner.entity'
import { LearnPath } from './learn-path.entity'

@Entity('learner-learn-path')
@Unique(['learnerId', 'learnPathId'])
export class LearnerLearnPath extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Index('idx_lpl_learner')
  @Column({ type: 'integer', nullable: false })
  learnerId: number

  @Index('idx_lpl_learn_path')
  @Column({ type: 'integer', nullable: false })
  learnPathId: number

  @Column({ type: 'boolean', default: false })
  completed: boolean

  @Column({ type: 'float', default: 0 })
  progress: number

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date

  @Column({ type: 'timestamp', nullable: true })
  lastAccessedAt: Date

  @Column({ type: 'integer', default: 0 })
  currentStep: number

  @ManyToOne(() => Learner, (learner) => learner.learnPathLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'learnerId' })
  learner: Learner

  @ManyToOne(() => LearnPath, (lp) => lp.learnerLinks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'learnPathId' })
  learnPath: LearnPath
}
