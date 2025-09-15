import { FileDto } from '@/common/dto/file.dto'
import { NameDto } from '@/common/dto/name.dto'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
export class CreateCourseDto {
  @IsNotEmpty()
  @Type(() => NameDto)
  title: NameDto

  @IsNotEmpty()
  @IsNumber()
  learnPathId: number

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @Type(() => FileDto)
  file: FileDto
}
