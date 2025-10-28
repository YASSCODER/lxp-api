import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
} from 'class-validator'
import { FileDto } from '@/common/dto/file.dto'
import { Type } from 'class-transformer'
import { EntrySkillLevel } from '@/common/enum/entry-skill-level.enum'
import { TargetSkillLevel } from '@/common/enum/target-skill-level.enum'
import { IsIn } from 'class-validator'
import { ProficiencyLevelEnum } from '@/common/enum/proficiency-level.enum'

export class GoogleAuthDto {
  @IsNotEmpty()
  @IsString()
  googleToken: string
}

export class GoogleSignupDto {
  @IsNotEmpty()
  @IsString()
  googleToken: string
}
