import { Injectable } from '@nestjs/common'
import { throwAuthorizationValidationError } from '@/common/utils/errors.utils'
import { Strategy } from 'passport-local'
import { AuthService } from '../api/auth.service'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ email, password })
    if (!user) {
      throwAuthorizationValidationError({
        message: {
          en: 'Credentials provided are not correct',
          ar: 'البيانات المقدمة غير صحيحة',
        },
      })
    }
    return user
  }
}
