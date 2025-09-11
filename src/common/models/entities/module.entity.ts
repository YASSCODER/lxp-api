import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FileEmbedded } from '../embedded/file.entity';
import { Skill } from './skills.entity';
import { BaseModel } from '../types/base-model.entity';

@Entity('module')
export class Module extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  file: FileEmbedded;

  @ManyToOne(() => Skill, (skill) => skill.modules)
  skill: Skill;
}
