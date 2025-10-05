import { UserLog } from '@/common/models/entities/user-log.entity'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OnEvent } from '@nestjs/event-emitter'
import { Repository } from 'typeorm'
import { UserLogEvent } from '../event/user-log.event'

@Injectable()
export class UserLogSubscriber {
  constructor(
    @InjectRepository(UserLog)
    private readonly userLogRepository: Repository<UserLog>,
  ) {}

  logger = new Logger('UserLogSubscriber')

  @OnEvent('create.user.log')
  async handleUserLogEvent(event: UserLogEvent) {
    try {
      this.logger.log(`Saving user log: ${event.userLogData.action}`)

      const userLog = this.userLogRepository.create(event.userLogData)

      await this.userLogRepository.save(userLog)

      this.logger.log(`User log saved: ${event.userLogData.action}`)
    } catch (error) {
      console.error('Error saving user log:', error)
    }
  }
}
