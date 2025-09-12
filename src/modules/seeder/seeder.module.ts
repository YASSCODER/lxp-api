import { Role } from '@/common/models/entities/role.entity'
import { User } from '@/common/models/entities/user.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleServiceSeeder } from './role/role.service'
import { RoleControllerSeeder } from './role/role.controller'
import { UserServiceSeeder } from './user/user.service'
import { UserControllerSeeder } from './user/user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  providers: [RoleServiceSeeder, UserServiceSeeder],
  controllers: [RoleControllerSeeder, UserControllerSeeder],
})
export class SeederModule {}
