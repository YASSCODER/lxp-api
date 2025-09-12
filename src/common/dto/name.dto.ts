import { IsOptional, IsString } from 'class-validator'

export class NameDto {
  @IsOptional()
  @IsString()
  en: string

  @IsOptional()
  @IsString()
  ar: string
}
