import {
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  DeleteDateColumn,
} from 'typeorm'

export class BaseModel {
  @CreateDateColumn({ type: 'timestamp' })
  createdAtTimestamp: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAtTimestamp: Date

  @VersionColumn({ nullable: true })
  version: number

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date
}
