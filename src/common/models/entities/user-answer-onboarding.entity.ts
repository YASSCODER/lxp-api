import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { OnboardingQuestion } from './onboarding-question.entity'
import { OnboardingAnswer } from './onboarding-answer.entity'
import { User } from './user.entity'

@Entity('user_answer_onboarding')
export class UserAnswerOnboarding extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int', nullable: true })
  userId: number

  @Column({ type: 'int', nullable: false })
  onboardingQuestionId: number

  @Column({ type: 'int', nullable: false })
  onboardingAnswerId: number

  @ManyToOne(() => User, (user) => user.userAnswerOnboardings)
  @JoinColumn({ name: 'userId' })
  user: User

  @ManyToOne(
    () => OnboardingQuestion,
    (onboardingQuestion) => onboardingQuestion.userAnswerOnboardings,
  )
  @JoinColumn({ name: 'onboardingQuestionId' })
  onboardingQuestion: OnboardingQuestion

  @ManyToOne(() => OnboardingAnswer)
  @JoinColumn({ name: 'onboardingAnswerId' })
  onboardingAnswer: OnboardingAnswer
}
