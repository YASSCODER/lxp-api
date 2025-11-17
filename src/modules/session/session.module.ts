import { Session } from '@/common/models/entities/session.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionController } from './api/session.controller'
import { SessionService } from './api/session.service'

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
