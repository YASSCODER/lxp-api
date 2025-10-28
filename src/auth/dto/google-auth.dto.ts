import { IsNotEmpty, IsString } from 'class-validator'

export class GoogleSignupDto {
  @IsNotEmpty()
  @IsString()
  googleToken: string
}
