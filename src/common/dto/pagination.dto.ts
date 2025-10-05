import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class PaginationDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  skip: number

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  take: number
}
