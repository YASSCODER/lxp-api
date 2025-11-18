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
  async createNoteSession(
    @Param('sessionId') sessionId: string,
    @Body() payload: CreateSummaryNotesDto,
  ) {
    return await this.noteSessionService.createSessionNote(payload, sessionId)
  }

  @Get(':sessionId/summary')
  async getNoteSession(
    @Param('sessionId') sessionId: string,
    @Req() request: { user: User },
  ) {
    return await this.noteSessionService.getSessionNote(sessionId, request.user)
  }
}
