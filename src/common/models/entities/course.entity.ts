import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { FileEmbedded } from '../embedded/file.entity'
import { LearnerCourseLinker } from './learner-course-linker.entity'
import { LearnPath } from './learn-path.entity'
import { NameEmbedded } from '../embedded/name.entity'

@Entity('course')
export class Course extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'jsonb', nullable: false })
  title: NameEmbedded

  @Column({ type: 'jsonb', nullable: false })
  file: FileEmbedded

  @Column({ type: 'integer', nullable: false })
  learnPathId: number

  @OneToMany(() => LearnerCourseLinker, (lcl) => lcl.course)
  learnerLink: LearnerCourseLinker[]

  @ManyToOne(() => LearnPath, (lp) => lp.courses)
  @JoinColumn({ name: 'learnPathId' })
  learnPath: LearnPath
}
