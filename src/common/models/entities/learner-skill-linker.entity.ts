import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
  Index,
} from 'typeorm';
import { BaseModel } from '../types/base-model.entity';
import { Learner } from './learner.entity';
import { Skill } from './skills.entity';

@Entity('learner_skill')
@Unique(['learnerId', 'skillId'])
export class LearnerSkillLinker extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  @Index()
  learnerId: number;

  @Column({ type: 'integer' })
  @Index()
  skillId: number;

  @Column({ type: 'int', default: 1 })
  currentLevel: number;

  @Column({ type: 'int', default: 1 })
  targetLevel: number;

  @ManyToOne(() => Learner, (learner) => learner.skillLink)
  @JoinColumn({ name: 'learnerId' })
  learner: Learner;

  @ManyToOne(() => Skill, (skill) => skill.learnerLinks)
  @JoinColumn({ name: 'skillId' })
  skill: Skill;
}
