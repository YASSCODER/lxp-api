import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { FileDto } from 'src/common/dto/file.dto'
import { FileEmbedded } from 'src/common/models/embedded/file.entity'

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  fullname: string

  @IsNotEmpty()
  @IsString()
  phone: string

  @IsOptional()
  @Type(() => FileDto)
  file: FileDto
}
