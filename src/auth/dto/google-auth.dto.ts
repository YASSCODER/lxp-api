import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class GoogleSignupDto {
  @IsNotEmpty()
  @IsString()
  googleToken: string // ID token (required)

  @IsOptional()
  @IsString()
  accessToken?: string // Access token (optional)

  @IsOptional()
  @IsString()
  refreshToken?: string // Refresh token (optional)

  @IsOptional()
  expiryDate?: Date | string // Access token expiry date (optional)
}
