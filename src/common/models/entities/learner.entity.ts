import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../types/base-model.entity';
import { BadgeLearnerLink } from './badge-learner-link.entity';
import { User } from './user.entity';

@Entity('learner')
export class Learner extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  roi: number;

  @Column({ type: 'float', nullable: true })
  score: number;

  @Column({ type: 'boolean', default: false })
  isPresent: boolean;

  @OneToMany(() => User, (user) => user.learner)
  users: User[];

  @OneToMany(() => BadgeLearnerLink, (link) => link.learner)
  badgeLinks: BadgeLearnerLink[];
}
