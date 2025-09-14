import { FileDto } from '@/common/dto/file.dto'
import { NameDto } from '@/common/dto/name.dto'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator'

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  title: NameDto

  @IsNotEmpty()
  @IsNumber()
  skillId: number

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @Type(() => FileDto)
  file: FileDto
}
