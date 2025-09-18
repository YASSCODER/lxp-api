import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { Role } from '@/common/models/entities/role.entity'
import { Roles } from '@/auth/decorators/roles.decorator'
import { UserRole } from '@/common/enum/user-role.enum'
import { CreateUserDto } from '../dto/create-user.dto'
import { FetchUserDto } from '../dto/fetch-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createAdminUser(@Body() payload: CreateUserDto) {
    return await this.userService.createAdminUser(payload)
  }

  @Get('total-user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getTotalUser() {
    return await this.userService.CountTotalUsers()
  }

  @Get('total-Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getTotalAdmin() {
    return await this.userService.getTotalAdmin()
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async listAllUser(@Query() query: FetchUserDto) {
    return await this.userService.listAllUsers(query)
  }

  @Get('admin/paginate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async listAllAdmin(@Query() query: FetchUserDto) {
    return await this.userService.listAllAdmin(query)
  }
}
