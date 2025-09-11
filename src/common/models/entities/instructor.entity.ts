import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../types/base-model.entity';
import { User } from './user.entity';
import { InstructorSkillLinker } from './instructor-skill-linker.entity';

@Entity('instructor')
export class Instructor extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  rating: number;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @OneToMany(() => User, (user) => user.instructor)
  users: User[];

  @OneToMany(() => InstructorSkillLinker, (isl) => isl.instructor)
  skillLink: InstructorSkillLinker[];
}
