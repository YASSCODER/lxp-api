import { FileDto } from '@/common/dto/file.dto'
import { NameDto } from '@/common/dto/name.dto'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateLearnPathDto {
  @IsNotEmpty()
  @Type(() => NameDto)
  title: NameDto

  @IsNotEmpty()
  @IsNumber()
  learningUnitId: number

  @IsOptional()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  hourToComplete: string
}
