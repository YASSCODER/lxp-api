import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { SessionService } from './session.service'
import { Roles } from '@/auth/decorators/roles.decorator'
import { CreateSessionDto } from '../dto/create-session.dto'
import { AddParticipantDto } from '../dto/add-participant.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UserRole } from '@/common/enum/user-role.enum'
import * as request from 'supertest'
import { User } from '@/common/models/entities/user.entity'

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async createSession(@Body() payload: CreateSessionDto) {
    return await this.sessionService.createSession(payload)
  }

  @Get(':roomId')
  @UseGuards(JwtAuthGuard)
  async getSessionByRoomId(@Param('roomId') roomId: string) {
    return await this.sessionService.getSessionByRoomId(roomId)
  }

  @Post(':sessionId/participants')
  @UseGuards(JwtAuthGuard)
  async addParticipant(
    @Param('sessionId') sessionId: string,
    @Req() request: { user: User },
  ) {
    return await this.sessionService.addParticipant(sessionId, request.user.id)
  }

  @Delete(':sessionId/participants')
  @UseGuards(JwtAuthGuard)
  async removeParticipant(
    @Param('sessionId') sessionId: string,
    @Req() request: { user: User },
  ) {
    return await this.sessionService.removeParticipant(
      sessionId,
      request.user.id,
    )
  }

  @Get(':sessionId/participants')
  @UseGuards(JwtAuthGuard)
  async getParticipants(@Param('sessionId') sessionId: string) {
    return await this.sessionService.getParticipants(sessionId)
  }
}
