import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AsyncLocalStorage } from 'async_hooks'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>()

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activate = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (user) {
      asyncLocalStorage.run(new Map(), () => {
        const store = asyncLocalStorage.getStore()
        if (store) {
          store.set('user', user)
          // Check if this is an impersonation
          if (user.isImpersonation) {
            store.set('impersonatedBy', user.impersonatedBy)
            store.set('impersonatorEmail', user.impersonatorEmail)
          }
        }
      })
    }

    return activate
  }
}

export function getUserFromContext() {
  const store = asyncLocalStorage.getStore()
  return store ? store.get('user') : null
}
