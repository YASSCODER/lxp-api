import { SessionNotes } from '@/common/models/entities/sessionNotes.entity'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSummaryNotesDto } from '../dto/create-summary-notes.dto'
import { User } from '@/common/models/entities/user.entity'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'

@Injectable()
export class NoteSessionService {
  constructor(
    @InjectRepository(SessionNotes)
    private readonly sessionNotesRepository: Repository<SessionNotes>,
  ) {}

  async createSessionNote(payload: CreateSummaryNotesDto, sessionId: number) {
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

  async getSessionNote(sessionId: number, user: User) {
    const sessionNotes = await this.sessionNotesRepository.findOne({
      where: { sessionId },
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

    const userInInstance = sessionNotes.summarySession.participantsId.includes(
      user.id,
    )

    if (!userInInstance) {
      throwFormValidationError({
        errorCode: ErrorCodes.FORBIDDEN_RESSOURCE_ACCESS,
        sessionId: {
          message: {
            en: 'You do not have access to these session notes',
            ar: 'ليس لديك حق الوصول إلى ملاحظات الجلسة هذه',
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
