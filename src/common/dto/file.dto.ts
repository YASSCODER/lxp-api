import { IsOptional, IsString } from 'class-validator';

export class FileDto {
  @IsOptional()
  @IsString()
  key: string;

  @IsOptional()
  @IsString()
  fileName: string;

  @IsOptional()
  @IsString()
  url: string;
}
