import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class FetchModuleDto {
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

export class FetchModuleAsListItemDto {
  @IsOptional()
  @IsString()
  searchLike: string
}
