import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UserRole } from '@/common/enum/user-role.enum'
import { Body, Controller, Ip, Post, Req, UseGuards } from '@nestjs/common'
import { CreateBadgeDto } from '../dto/create-badge.dto'
import { Roles } from '@/auth/decorators/roles.decorator'
import { BadgeService } from './badge.service'
import { User } from '@/common/models/entities/user.entity'

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createBadge(
    @Body() payload: CreateBadgeDto,
    @Req() req: { user: User },
    @Ip() ip: string,
  ) {
    return await this.badgeService.createBadge(payload, req.user, ip)
  }
}
