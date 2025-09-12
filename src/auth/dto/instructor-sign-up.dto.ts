import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { FileDto } from '@/common/dto/file.dto'
import { ProficiencyLevelEnum } from '@/common/enum/proficiency-level.enum'
import { SignUpDto } from './sign-up.dto'

export class InstructorSignUpDto extends SignUpDto {
  @IsNotEmpty()
  @IsIn([
    ProficiencyLevelEnum.STARTER,
    ProficiencyLevelEnum.PRO,
    ProficiencyLevelEnum.GROWTH,
    ProficiencyLevelEnum.ELITE,
  ])
  proficiencyLevel: ProficiencyLevelEnum

  @IsNotEmpty()
  @IsString()
  yearsOfExperience: string

  @IsOptional()
  @Type(() => FileDto)
  file: FileDto
}
