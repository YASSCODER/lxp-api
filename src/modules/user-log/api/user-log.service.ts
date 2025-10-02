import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { UserLogInterface } from '../types/user-log.interface'
import { UserLogEvent } from '../event/user-log.event'

@Injectable()
export class UserLogService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  logger = new Logger('UserLogService')
  async saveUserLog(userLog: UserLogInterface) {
    this.logger.log(`Emitting user log event: ${userLog.action}`)
    const event = new UserLogEvent(userLog)
    this.eventEmitter.emit('create.user.log', event)
    this.logger.log(`User log saved: ${userLog.action}`)
  }
}
