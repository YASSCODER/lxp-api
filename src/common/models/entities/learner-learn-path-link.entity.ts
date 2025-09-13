import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { Learner } from './learner.entity'
import { LearnPath } from './learn-path.entity'

@Entity('learner-learn-path')
export class LearnerLearnPath extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Index('idx_lpl_learner')
  @Column({ type: 'integer', nullable: false })
  learnerId: number

  @Index('idx_lpl_learn_path')
  @Column({ type: 'number', nullable: false })
  learnPathID: number

  @Column({ type: 'boolean', default: false })
  completed: boolean

  @Column({ type: 'float', default: 0 })
  progress: number

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date

  @ManyToOne(() => Learner, (learner) => learner.learnPathLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'learnerId' })
  learner: Learner

  @ManyToOne(() => LearnPath, (lp) => lp.learnerLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'learnPathId' })
  learnPath: LearnPath
}
