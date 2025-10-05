import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { OnboardingQuestion } from './onboarding-question.entity'
import { AnswerEnum } from '../../enum/answers.enum'
import { AnswerTextEmbedded } from '../embedded/answer-text.embedded'

@Entity('onboarding_answer')
export class OnboardingAnswer extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: AnswerEnum,
    nullable: false,
  })
  answerKey: AnswerEnum

  @Column({ type: 'int', nullable: false })
  onboardingQuestionId: number

  @Column({ type: 'jsonb', nullable: false })
  answerText: AnswerTextEmbedded

  @Column({ type: 'integer', nullable: true })
  scale?: number

  @ManyToOne(
    () => OnboardingQuestion,
    (onboardingQuestion) => onboardingQuestion.onboardingAnswers,
  )
  @JoinColumn({ name: 'onboardingQuestionId' })
  onboardingQuestion: OnboardingQuestion
}
