import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export class NameEmbedded {
  @Column({ type: 'varchar' })
  en: string

  @Column({ type: 'varchar' })
  ar: string
}
