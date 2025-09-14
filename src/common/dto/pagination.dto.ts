import { IsNumber } from 'class-validator'

export class PaginationDto {
  @IsNumber()
  skip: number

  @IsNumber()
  take: number
}
