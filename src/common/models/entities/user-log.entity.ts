import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { LogStatus } from '@/common/enum/logs-status.enum'
import { User } from './user.entity'

@Entity('user_log')
export class UserLog extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false })
  userId: number

  @Column({ type: 'varchar', nullable: false })
  action: string

  @Column({ type: 'timestamp', nullable: false })
  timestamp: Date

  @Column({ type: 'varchar', nullable: false })
  status: LogStatus

  @Column({ type: 'varchar', nullable: false })
  ip: string

  @ManyToOne(() => User, (user) => user.userLogs)
  @JoinColumn({ name: 'userId' })
  user: User
}
