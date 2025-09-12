import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { Badge } from './badge.entity'
import { Learner } from './learner.entity'

@Entity('badge_learner_link')
export class BadgeLearnerLink extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int', nullable: false })
  badgeId: number

  @Column({ type: 'int', nullable: false })
  learnerId: number

  @Column({ type: 'boolean', default: false })
  isAssigned: boolean

  @ManyToOne(() => Badge, (badge) => badge.learnerLinks)
  @JoinColumn({ name: 'badgeId' })
  badge: Badge

  @ManyToOne(() => Learner, (learner) => learner.badgeLinks)
  @JoinColumn({ name: 'learnerId' })
  learner: Learner
}
