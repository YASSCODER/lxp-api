import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CreateSummaryNotesDto } from '../dto/create-summary-notes.dto'
import { NoteSessionService } from './note-session.service'
import { UserRole } from '@/common/enum/user-role.enum'
import { User } from '@/common/models/entities/user.entity'

@Controller('note-sessions')
export class NoteSessionController {
  constructor(private readonly noteSessionService: NoteSessionService) {}

  @Post(':sessionId/summary')
  @UseGuards(JwtAuthGuard)
  async createNoteSession(
    @Param('sessionId') sessionId: number,
    @Body() payload: CreateSummaryNotesDto,
  ) {
    return await this.noteSessionService.createSessionNote(payload, sessionId)
  }

  @Get(':sessionId/summary')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR, UserRole.LEARNER)
  async getNoteSession(
    @Param('sessionId') sessionId: number,
    @Req() request: { user: User },
  ) {
    return await this.noteSessionService.getSessionNote(sessionId, request.user)
  }
}
