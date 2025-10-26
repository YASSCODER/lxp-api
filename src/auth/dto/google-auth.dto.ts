import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator'
import { FileDto } from '@/common/dto/file.dto'
import { Type } from 'class-transformer'
import { EntrySkillLevel } from '@/common/enum/entry-skill-level.enum'
import { TargetSkillLevel } from '@/common/enum/target-skill-level.enum'
import { IsIn } from 'class-validator'

export class GoogleAuthDto {
  @IsNotEmpty()
  @IsString()
  googleToken: string
}

export class GoogleSignupDto {
  @IsNotEmpty()
  @IsString()
  googleToken: string

  @IsNotEmpty()
  @IsString()
  fullname: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @Type(() => FileDto)
  file?: FileDto

  @IsOptional()
  @IsIn([
    EntrySkillLevel.INTERMEDIATE,
    EntrySkillLevel.EXPERT,
    EntrySkillLevel.BEGINNER,
    EntrySkillLevel.ADVANCED,
  ])
  currentLevels?: string

  @IsOptional()
  @IsIn([
    TargetSkillLevel.PROFESSIONAL,
    TargetSkillLevel.EXPERT,
    TargetSkillLevel.ADVANCED,
    TargetSkillLevel.INTERMEDIATE,
  ])
  targetLevels?: string
}
