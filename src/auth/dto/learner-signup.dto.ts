import { EntrySkillLevel } from '@/common/enum/entry-skill-level.enum';
import { SignUpDto } from './sign-up.dto';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TargetSkillLevel } from '@/common/enum/target-skill-level.enum';

export class LearnerSignUpDto extends SignUpDto {
  @IsNotEmpty()
  @IsIn([
    EntrySkillLevel.INTERMEDIATE,
    EntrySkillLevel.EXPERT,
    EntrySkillLevel.BEGINNER,
    EntrySkillLevel.ADVANCED,
  ])
  currentLevels: EntrySkillLevel;

  @IsNotEmpty()
  @IsIn([
    TargetSkillLevel.PROFESSIONAL,
    TargetSkillLevel.EXPERT,
    TargetSkillLevel.ADVANCED,
    TargetSkillLevel.INTERMEDIATE,
  ])
  targetLevels: TargetSkillLevel;
}
