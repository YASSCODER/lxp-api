import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { UserLogService } from './user-log.service'
import { FetchUserLogDto } from '../dto/fetch-user-log.dto'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { UserRole } from '@/common/enum/user-role.enum'
import { Roles } from '@/auth/decorators/roles.decorator'

@Controller('user-log')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @Get('list/paginate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async listUserLog(@Query() query: FetchUserLogDto) {
    return await this.userLogService.listAllUserLogs(query)
  }
}
