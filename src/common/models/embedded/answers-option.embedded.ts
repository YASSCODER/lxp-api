import { Column } from 'typeorm'

export class AnswersOption {
  @Column({ type: 'jsonb' })
  text: { en: string; ar: string }

  @Column({ type: 'integer', nullable: true })
  scale?: number
}
