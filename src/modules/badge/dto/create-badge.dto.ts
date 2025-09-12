import { FileDto } from '@/common/dto/file.dto'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateBadgeDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @Type(() => FileDto)
  file: FileDto
}
