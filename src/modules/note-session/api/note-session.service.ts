import { SessionNotes } from '@/common/models/entities/sessionNotes.entity'
import { Session } from '@/common/models/entities/session.entity'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSummaryNotesDto } from '../dto/create-summary-notes.dto'
import { User } from '@/common/models/entities/user.entity'
import {
  throwFormValidationError,
  throwForbiddenError,
} from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'

@Injectable()
export class NoteSessionService {
  constructor(
    @InjectRepository(SessionNotes)
    private readonly sessionNotesRepository: Repository<SessionNotes>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async createSessionNote(payload: CreateSummaryNotesDto, sessionId: string) {
    const notes = this.sessionNotesRepository.create({
      summarySession: payload.summary,
      sessionId: payload.sessionId,
      roomId: payload.roomId,
      userId: payload.userId,
      instructorId: payload.instructorId,
    })

    await this.sessionNotesRepository.save(notes)

    return {
      status: HttpStatus.CREATED,
      message: 'Session notes created successfully',
    }
  }

  async getSessionNote(sessionId: string, user: User) {
    const sessionNotes = await this.sessionNotesRepository.findOne({
      where: { sessionId: sessionId },
    })

    if (!sessionNotes) {
      throwFormValidationError({
        errorCode: ErrorCodes.SESSION_NOTES_NOT_FOUND,
        sessionId: {
          message: {
            en: 'session notes not found',
            ar: 'ملاحظات الجلسة غير موجودة',
          },
        },
      })
    }

    const summary = {
      summary: sessionNotes.summarySession,
      sessionId: sessionNotes.sessionId,
      roomId: sessionNotes.roomId,
      userId: sessionNotes.userId,
      instructorId: sessionNotes.instructorId,
    }

    return summary
  }
}
