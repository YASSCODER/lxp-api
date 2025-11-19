import { Session } from '@/common/models/entities/session.entity'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSessionDto } from '../dto/create-session.dto'
import { AddParticipantDto } from '../dto/add-participant.dto'
import { User } from '@/common/models/entities/user.entity'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async createSession(payload: CreateSessionDto) {
    const session = this.sessionRepository.create({
      title: payload.title,
      roomId: payload.roomId,
    })

    const sessionSaved = await this.sessionRepository.save(session)

    return {
      id: sessionSaved.id,
      sessionId: sessionSaved.id,
      session: {
        id: sessionSaved.id,
        title: sessionSaved.title,
        roomId: sessionSaved.roomId,
      },
    }
  }

  async getSessionByRoomId(roomId: string) {
    const session = await this.sessionRepository.findOne({
      where: { roomId },
    })

    if (!session) {
      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        roomId: {
          message: {
            en: 'Session not found for this room',
            ar: 'الجلسة غير موجودة لهذه الغرفة',
          },
        },
      })
    }

    return {
      sessionId: session.id,
    }
  }

  async addParticipant(sessionId: string, userId: number) {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    })

    if (!session) {
      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        sessionId: {
          message: {
            en: 'Session not found',
            ar: 'الجلسة غير موجودة',
          },
        },
      })
    }

    // Get current participants from metadata or initialize empty array
    const metadata = session.metadata || { participants: [] }
    const participants = metadata.participants || []

    // Add userId if not already present
    if (!participants.includes(userId)) {
      participants.push(userId)
      metadata.participants = participants

      // Update session with new metadata
      await this.sessionRepository
        .createQueryBuilder()
        .update(Session)
        .set({ metadata: metadata })
        .where('id = :sessionId', { sessionId })
        .execute()
    }

    return {
      participants: participants,
      message: 'Participant added successfully',
    }
  }

  async removeParticipant(sessionId: string, userId: number) {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    })

    if (!session) {
      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        sessionId: {
          message: {
            en: 'Session not found',
            ar: 'الجلسة غير موجودة',
          },
        },
      })
    }

    // Get current participants from metadata
    const metadata = session.metadata || { participants: [] }
    const participants = (metadata.participants || []).filter(
      (id: number) => id !== userId,
    )
    metadata.participants = participants

    // Update session with new metadata
    await this.sessionRepository
      .createQueryBuilder()
      .update(Session)
      .set({ metadata: metadata })
      .where('id = :sessionId', { sessionId })
      .execute()

    return {
      participants: participants,
      message: 'Participant removed successfully',
    }
  }

  async getParticipants(sessionId: string) {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    })

    if (!session) {
      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        sessionId: {
          message: {
            en: 'Session not found',
            ar: 'الجلسة غير موجودة',
          },
        },
      })
    }

    // Get participants from metadata
    const metadata = session.metadata || { participants: [] }
    const participants = metadata.participants || []

    return {
      participants: participants,
      count: participants.length,
    }
  }
}
