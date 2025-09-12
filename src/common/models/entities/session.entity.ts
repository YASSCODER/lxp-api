import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { Presence } from './presence.entity'

@Entity('session')
export class Session extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'timestamp' })
  startAt: string

  @Column({ type: 'timestamp' })
  endAt: string

  @Column({ type: 'timestamp' })
  scheduledAt: Date

  @OneToMany(() => Presence, (p) => p.session)
  presences: Presence[]
}
