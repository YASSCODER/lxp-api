import {
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  DeleteDateColumn,
} from 'typeorm'

export class BaseModel {
  @CreateDateColumn({ nullable: true, type: 'date' })
  createdAt: Date

  @UpdateDateColumn({ nullable: true, type: 'date' })
  updatedAt: Date

  @VersionColumn({ nullable: true, type: 'number' })
  version: number

  @DeleteDateColumn({ nullable: true, type: 'date' })
  deletedAt: Date

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  createdAtTimestamp: Date

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  updatedAtTimestamp: Date
}
