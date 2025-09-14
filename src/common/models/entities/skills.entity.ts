import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { NameEmbedded } from '../embedded/name.entity'
import { InstructorSkillLinker } from './instructor-skill-linker.entity'
import { LearnerSkillLinker } from './learner-skill-linker.entity'
import { BaseModel } from '../types/base-model.entity'
import { FileEmbedded } from '../embedded/file.entity'
import { LearningUnit } from './module.entity'
@Entity('skill')
export class Skill extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'jsonb', nullable: false })
  title: NameEmbedded

  @Column({ type: 'varchar', nullable: true })
  description: string

  @Column({ type: 'jsonb', nullable: true })
  file: FileEmbedded

  @OneToMany(() => InstructorSkillLinker, (isl) => isl.skill)
  instructorLinks: InstructorSkillLinker[]

  @OneToMany(() => LearnerSkillLinker, (lsl) => lsl.skill)
  learnerLinks: LearnerSkillLinker[]

  @OneToMany(() => LearningUnit, (lu) => lu.skill)
  modules: LearningUnit[]
}
