import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Learner } from './learner.entity';
import { BaseModel } from '../types/base-model.entity';
import { Session } from './session.entity';

@Entity('presence')
export class Presence extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: true })
  learnerId: number;

  @Column({ type: 'uuid' })
  sessionId: string;

  @ManyToOne(() => Learner, (l) => l.presences)
  learner: Learner;

  @ManyToOne(() => Session, (s) => s.presences)
  @JoinColumn({ name: 'sessionId' })
  session: Session;
}
