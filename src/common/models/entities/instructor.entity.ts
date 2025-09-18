import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { User } from './user.entity'
import { InstructorSkillLinker } from './instructor-skill-linker.entity'
import { ProficiencyLevelEnum } from '@/common/enum/proficiency-level.enum'

@Entity('instructor')
export class Instructor extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'float', nullable: true })
  rating: number

  @Column({ type: 'boolean', default: false })
  isVerified: boolean

  @OneToOne(() => User, (user) => user.instructor)
  user: User

  @OneToMany(() => InstructorSkillLinker, (isl) => isl.instructor)
  skillLink: InstructorSkillLinker[]
}
