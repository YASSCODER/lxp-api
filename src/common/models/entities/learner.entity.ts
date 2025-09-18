import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { BadgeLearnerLink } from './badge-learner-link.entity'
import { User } from './user.entity'
import { Presence } from './presence.entity'
import { LearnerSkillLinker } from './learner-skill-linker.entity'
import { EntrySkillLevel } from '@/common/enum/entry-skill-level.enum'
import { TargetSkillLevel } from '@/common/enum/target-skill-level.enum'
import { LearnerCourseLinker } from './learner-course-linker.entity'
import { LearnerLearnPath } from './learner-learn-path-link.entity'
import { LearnerModuleLinker } from './learner-module-link.entity'

@Entity('learner')
export class Learner extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'numeric', nullable: true })
  roi: number

  @Column({ type: 'float', nullable: true })
  score: number

  @Column({ type: 'boolean', default: false })
  isPresent: boolean

  @Column({ type: 'varchar', nullable: true })
  currentLevels: EntrySkillLevel

  @Column({ type: 'varchar', nullable: true })
  targetLevels: TargetSkillLevel

  @OneToOne(() => User, (user) => user.learner)
  user: User

  @OneToMany(() => BadgeLearnerLink, (link) => link.learner)
  badgeLinks: BadgeLearnerLink[]

  @OneToMany(() => Presence, (p) => p.learner)
  presences: Presence[]

  @OneToMany(() => LearnerSkillLinker, (lsl) => lsl.learner)
  skillLink: LearnerSkillLinker[]

  @OneToMany(() => LearnerCourseLinker, (lcl) => lcl.learner)
  courseLink: LearnerCourseLinker[]

  @OneToMany(() => LearnerLearnPath, (lpl) => lpl.learner)
  learnPathLink: LearnerLearnPath[]

  @OneToMany(() => LearnerModuleLinker, (lml) => lml.learner)
  moduleLinks: LearnerModuleLinker[]
}
