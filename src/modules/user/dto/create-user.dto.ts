import { FileDto } from '@/common/dto/file.dto'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  fullName: string

  @IsNotEmpty()
  @IsString()
  phone: string

  @IsOptional()
  @Type(() => FileDto)
  file: FileDto
}
