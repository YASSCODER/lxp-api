import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { FileEmbedded } from '../embedded/file.entity'
import { Skill } from './skills.entity'
import { BaseModel } from '../types/base-model.entity'
import { LearnerModuleLinker } from './learner-module-link.entity'
import { LearnPath } from './learn-path.entity'

@Entity('module')
export class LearningUnit extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string

  @Column({ type: 'varchar', nullable: true })
  description: string

  @Column({ type: 'jsonb', nullable: true })
  file: FileEmbedded

  @Column({ type: 'int', nullable: false })
  skillId: number

  @ManyToOne(() => Skill, (skill) => skill.modules)
  @JoinColumn({ name: 'skillId' })
  skill: Skill

  @OneToMany(() => LearnPath, (lp) => lp.module)
  learnPaths: LearnPath[]

  @OneToMany(() => LearnerModuleLinker, (lml) => lml.module)
  learnerLinks: LearnerModuleLinker[]
}
