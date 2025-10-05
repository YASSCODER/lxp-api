import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { QuestionEnum } from '../../enum/question.enum'
import { AnswerEnum } from '../../enum/answers.enum'
import { User } from './user.entity'
import { UserAnswerOnboarding } from './user-answer-onboarding.entity'
import { AnswersOption } from '../embedded/answers-option.embedded'
import { QuestionTextEmbedded } from '../embedded/question-text.embedded'

@Entity('onboarding_question')
export class OnboardingQuestion extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: QuestionEnum,
    nullable: false,
  })
  question: QuestionEnum

  @Column({
    type: 'enum',
    enum: AnswerEnum,
    nullable: false,
  })
  answer: AnswerEnum

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  questionText: QuestionTextEmbedded

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  answerOptions: AnswersOption[]

  @OneToMany(
    () => UserAnswerOnboarding,
    (userAnswerOnboarding) => userAnswerOnboarding.onboardingQuestion,
  )
  userAnswerOnboardings: UserAnswerOnboarding[]
}
