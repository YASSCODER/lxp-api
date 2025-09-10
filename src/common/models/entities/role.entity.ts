import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../types/base-model.entity';
import { Name } from '../embedded/name.entity';
import { User } from './user.entity';

@Entity('role')
export class Role extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', unique: true, nullable: false })
  title: Name;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
