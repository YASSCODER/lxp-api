import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseModel } from '../types/base-model.entity'
import { OnboardingQuestion } from './onboarding-question.entity'
import { User } from './user.entity'

@Entity('user_answer_onboarding')
export class UserAnswerOnboarding extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int', nullable: true })
  userId: number

  @Column({ type: 'int', nullable: true })
  onboardingQuestionId: number

  @Column({ type: 'varchar', nullable: true })
  answer: string

  @ManyToOne(() => User, (user) => user.userAnswerOnboardings)
  @JoinColumn({ name: 'userId' })
  user: User

  @ManyToOne(
    () => OnboardingQuestion,
    (onboardingQuestion) => onboardingQuestion.userAnswerOnboardings,
  )
  @JoinColumn({ name: 'onboardingQuestionId' })
  onboardingQuestion: OnboardingQuestion
}
