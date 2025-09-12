import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { BadgeLearnerLink } from './badge-learner-link.entity'
import { User } from './user.entity'
import { Presence } from './presence.entity'
import { LearnerSkillLinker } from './learner-skill-linker.entity'
import { EntrySkillLevel } from '@/common/enum/entry-skill-level.enum'
import { TargetSkillLevel } from '@/common/enum/target-skill-level.enum'

@Entity('learner')
export class Learner extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'float', nullable: true })
  roi: number

  @Column({ type: 'float', nullable: true })
  score: number

  @Column({ type: 'boolean', default: false })
  isPresent: boolean

  @Column({ type: 'varchar', nullable: false })
  currentLevels: EntrySkillLevel

  @Column({ type: 'varchar', nullable: false })
  targetLevels: TargetSkillLevel

  @OneToMany(() => User, (user) => user.learner)
  users: User[]

  @OneToMany(() => BadgeLearnerLink, (link) => link.learner)
  badgeLinks: BadgeLearnerLink[]

  @OneToMany(() => Presence, (p) => p.learner)
  presences: Presence[]

  @OneToMany(() => LearnerSkillLinker, (lsl) => lsl.learner)
  skillLink: LearnerSkillLinker[]
}
