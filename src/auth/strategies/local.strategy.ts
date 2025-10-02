import { Injectable } from '@nestjs/common'
import { throwAuthorizationValidationError } from '@/common/utils/errors.utils'
import { Strategy } from 'passport-local'
import { AuthService } from '../api/auth.service'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async validate(
    req: any,
    email: string,
    password: string,
  ): Promise<any> {
    const ip = req.ip || req.connection.remoteAddress || 'unknown'
    const user = await this.authService.validateUser({ email, password }, ip)
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
