import { UserLog } from '@/common/models/entities/user-log.entity'
import { Injectable } from '@nestjs/common'
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

  @OnEvent('create.user.log')
  async handleUserLogEvent(event: UserLogEvent) {
    try {
      const userLog = this.userLogRepository.create(event.userLogData)
      await this.userLogRepository.save(userLog)
    } catch (error) {
      console.error('Error saving user log:', error)
    }
  }
}
