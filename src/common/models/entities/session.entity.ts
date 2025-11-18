import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { Presence } from './presence.entity'

@Entity('session')
export class Session extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'integer', nullable: true })
  learnerId: number

  @Column({ type: 'varchar', nullable: false })
  roomId: string

  @Column({ type: 'timestamp', nullable: true })
  startAt: string

  @Column({ type: 'timestamp', nullable: true })
  endAt: string

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt: Date

  @OneToMany(() => Presence, (p) => p.session)
  presences: Presence[]
}
