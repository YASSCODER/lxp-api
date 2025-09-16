import { IsNotEmpty, IsNumber } from 'class-validator'

export class AssignSkillToLearner {
  @IsNotEmpty()
  @IsNumber()
  skillId: number
}
