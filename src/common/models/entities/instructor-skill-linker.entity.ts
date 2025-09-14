import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
  Index,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { Instructor } from './instructor.entity'
import { Skill } from './skills.entity'
import { ProficiencyLevelEnum } from '@/common/enum/proficiency-level.enum'

@Entity('instructor_skill')
@Unique(['instructorId', 'skillId'])
export class InstructorSkillLinker extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer' })
  @Index()
  instructorId: number

  @Column({ type: 'integer' })
  @Index()
  skillId: number

  @Column({ type: 'varchar', nullable: false })
  proficiencyLevel: ProficiencyLevelEnum

  @Column({ type: 'int', nullable: true })
  yearsOfExperience: number

  @ManyToOne(() => Instructor, (instructor) => instructor.skillLink)
  @JoinColumn({ name: 'instructorId' })
  instructor: Instructor

  @ManyToOne(() => Skill, (skill) => skill.instructorLinks)
  @JoinColumn({ name: 'skillId' })
  skill: Skill
}
