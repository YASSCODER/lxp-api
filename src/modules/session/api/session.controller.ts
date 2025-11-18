import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { SessionService } from './session.service'
import { Roles } from '@/auth/decorators/roles.decorator'
import { CreateSessionDto } from '../dto/create-session.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UserRole } from '@/common/enum/user-role.enum'
import * as request from 'supertest'
import { User } from '@/common/models/entities/user.entity'

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async createSession(
    @Body() payload: CreateSessionDto,
    request: { user: User },
  ) {
    return await this.sessionService.createSession(payload, request.user)
  }
}
