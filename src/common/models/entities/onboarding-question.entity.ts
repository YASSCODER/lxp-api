import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { QuestionEnum } from '../../enum/question.enum'
import { QuestionTextEmbedded } from '../embedded/question-text.embedded'
import { OnboardingAnswer } from './onboarding-answer.entity'
import { UserAnswerOnboarding } from './user-answer-onboarding.entity'

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
    type: 'jsonb',
    nullable: false,
  })
  questionText: QuestionTextEmbedded

  @OneToMany(
    () => OnboardingAnswer,
    (onboardingAnswer) => onboardingAnswer.onboardingQuestion,
  )
  onboardingAnswers: OnboardingAnswer[]

  @OneToMany(
    () => UserAnswerOnboarding,
    (userAnswerOnboarding) => userAnswerOnboarding.onboardingQuestion,
  )
  userAnswerOnboardings: UserAnswerOnboarding[]
}
