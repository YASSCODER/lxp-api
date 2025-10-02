import { User } from '@/common/models/entities/user.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './api/user.service'
import { UserController } from './api/user.controller'
import { Role } from '@/common/models/entities/role.entity'
import { PaginationService } from '@/common/pagination/pagination.service'
import { UserLogService } from '../user-log/api/user-log.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService, PaginationService, UserLogService],
  controllers: [UserController],
})
export class UserModule {}
