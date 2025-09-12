import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { FileEmbedded } from '../embedded/file.entity'
import { BadgeLearnerLink } from './badge-learner-link.entity'

@Entity('badge')
export class Badge extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'jsonb', nullable: true })
  image: FileEmbedded

  @OneToMany(() => BadgeLearnerLink, (link) => link.badge)
  learnerLinks: BadgeLearnerLink[]
}
