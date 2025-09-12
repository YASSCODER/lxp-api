import { FileDto } from '@/common/dto/file.dto'
import { NameDto } from '@/common/dto/name.dto'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSkillDto {
  @IsNotEmpty()
  @Type(() => NameDto)
  title: NameDto

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @Type(() => FileDto)
  file: FileDto
}
