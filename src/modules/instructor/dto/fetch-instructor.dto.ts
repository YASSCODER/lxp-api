import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class FetchInstructorDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  skip: number

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  take: number

  @IsOptional()
  @IsString()
  searchLike: string
}
