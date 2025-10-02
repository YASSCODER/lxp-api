import { LogStatus } from '@/common/enum/logs-status.enum'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class FetchUserLogDto {
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

  @IsOptional()
  @IsString()
  fromDate: string

  @IsOptional()
  @IsString()
  toDate: string

  @IsOptional()
  @IsString()
  status: LogStatus
}
