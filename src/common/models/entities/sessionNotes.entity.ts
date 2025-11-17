import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { SummaryEmbedded } from '../embedded/summary.embedded'

@Entity('session_notes')
export class SessionNotes extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'jsonb', nullable: true })
  summarySession: SummaryEmbedded

  @Column({ type: 'integer', nullable: false })
  sessionId: number

  @Column({ type: 'integer', nullable: false })
  roomId: number

  @Column({ type: 'integer', nullable: false })
  userId: number

  @Column({ type: 'integer', nullable: false })
  instructorId: number
}
