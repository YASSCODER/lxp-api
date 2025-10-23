import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { User } from './user.entity'
import { NotificationContentEmbedded } from '../embedded/notification-content.embedded'

@Entity('notification')
export class Notification extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false })
  userId: number

  @Column({ type: 'jsonb', nullable: false })
  content: NotificationContentEmbedded

  @Column({ type: 'varchar', nullable: true })
  link: string

  @Column({ type: 'varchar', nullable: false })
  type: string

  @Column({ type: 'boolean', default: false })
  isViewed: boolean

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User
}
