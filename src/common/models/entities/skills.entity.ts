import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NameEmbedded } from '../embedded/name.entity';
import { InstructorSkillLinker } from './instructor-skill-linker.entity';
import { LearnerSkillLinker } from './learner-skill-linker.entity';
import { Module } from './module.entity';
import { BaseModel } from '../types/base-model.entity';
@Entity('skill')
export class Skill extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: NameEmbedded;

  @OneToMany(() => InstructorSkillLinker, (isl) => isl.skill)
  instructorLinks: InstructorSkillLinker[];

  @OneToMany(() => LearnerSkillLinker, (lsl) => lsl.skill)
  learnerLinks: LearnerSkillLinker[];

  @OneToMany(() => Module, (module) => module.skill)
  modules: Module;
}
