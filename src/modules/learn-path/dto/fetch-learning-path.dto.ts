import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class FetchLearnPathDto {
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

export class FetchLearnPathAsItem {
  @IsOptional()
  @IsString()
  searchLike: string
}
