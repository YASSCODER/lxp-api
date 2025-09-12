import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { Role } from './role.entity'
import { Learner } from './learner.entity'
import { Instructor } from './instructor.entity'
import { FileEmbedded } from '../embedded/file.entity'

@Entity('user')
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'jsonb', nullable: true })
  file: FileEmbedded

  @Column({ type: 'varchar', length: 100, nullable: false })
  fullName: string

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string

  @Column({ type: 'varchar', nullable: true, unique: true })
  phone: string

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @Column({ type: 'uuid', nullable: false })
  roleId: string

  @Column({ type: 'int', nullable: true })
  learnerId: number

  @Column({ type: 'int', nullable: true })
  instructorId: number

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role

  @ManyToOne(() => Learner, (learner) => learner.users)
  @JoinColumn({ name: 'learnerId' })
  learner: Learner

  @ManyToOne(() => Instructor, (instructor) => instructor.users)
  @JoinColumn({ name: 'instructorId' })
  instructor: Instructor
}
