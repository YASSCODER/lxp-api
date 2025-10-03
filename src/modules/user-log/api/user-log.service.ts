import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { UserLogInterface } from '../types/user-log.interface'
import { UserLogEvent } from '../event/user-log.event'
import { PaginationResult } from '@/common/pagination/pagination.service'
import { FetchUserLogDto } from '../dto/fetch-user-log.dto'
import { paginationParamsFormula } from '@/common/utils/pagination-formula.utils'
import { DeepPartial } from 'typeorm'
import { UserLog } from '@/common/models/entities/user-log.entity'
import { Repository } from 'typeorm'
import { PaginationService } from '@/common/pagination/pagination.service'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserLogService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly paginationService: PaginationService,
    @InjectRepository(UserLog)
    private readonly userLogRepository: Repository<UserLog>,
  ) {}

  logger = new Logger('UserLogService')
  async saveUserLog(userLog: UserLogInterface) {
    this.logger.log(`Emitting user log event: ${userLog.action}`)
    const event = new UserLogEvent(userLog)
    this.eventEmitter.emit('create.user.log', event)
    this.logger.log(`User log saved: ${userLog.action}`)
  }

  async listAllUserLogs(
    query: FetchUserLogDto,
  ): Promise<PaginationResult<DeepPartial<UserLog>>> {
    const paginationParams = paginationParamsFormula(query)
    const qb = this.userLogRepository.createQueryBuilder('userLog')
    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )
    return {
      data,
      pagination,
    }
  }
}
