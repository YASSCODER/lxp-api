import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { Role } from './role.entity'
import { Learner } from './learner.entity'
import { Instructor } from './instructor.entity'
import { FileEmbedded } from '../embedded/file.entity'
import { UserLog } from './user-log.entity'
import { OnboardingQuestion } from './onboarding-question.entity'
import { UserAnswerOnboarding } from './user-answer-onboarding.entity'

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

  @Column({ type: 'varchar', length: 255, nullable: true })
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

  @Index()
  @Column({ name: 'google_id', nullable: true, unique: true })
  googleId?: string

  @Column({ name: 'google_email_verified', type: 'boolean', default: false })
  googleEmailVerified: boolean

  @Column({
    name: 'google_refresh_token',
    nullable: true,
    type: 'text',
    select: false,
  })
  googleRefreshToken?: string

  @Column({
    name: 'google_access_token',
    nullable: true,
    type: 'text',
    select: false,
  })
  googleAccessToken?: string

  @Column({
    name: 'google_access_token_expiry',
    type: 'timestamp with time zone',
    nullable: true,
  })
  googleAccessTokenExpiry?: Date

  @Column({ name: 'google_tokens_revoked', type: 'boolean', default: false })
  googleTokensRevoked: boolean

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role

  @OneToOne(() => Learner, (learner) => learner.user)
  @JoinColumn({ name: 'learnerId' })
  learner: Learner

  @OneToOne(() => Instructor, (instructor) => instructor.user)
  @JoinColumn({ name: 'instructorId' })
  instructor: Instructor

  @OneToMany(() => UserLog, (userLog) => userLog.user)
  userLogs: UserLog[]

  @OneToMany(
    () => UserAnswerOnboarding,
    (userAnswerOnboarding) => userAnswerOnboarding.user,
  )
  userAnswerOnboardings: UserAnswerOnboarding[]
}
