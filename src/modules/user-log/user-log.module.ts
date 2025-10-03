import { UserLog } from '@/common/models/entities/user-log.entity'
import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserLogService } from './api/user-log.service'
import { UserLogController } from './api/user-log.controller'
import { UserLogSubscriber } from './subscriber/user-log.subscriber'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserLog])],
  providers: [UserLogService, UserLogSubscriber],
  controllers: [UserLogController],
  exports: [UserLogService],
})
export class UserLogModule {}
