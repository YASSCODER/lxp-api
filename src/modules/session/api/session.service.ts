import { Session } from '@/common/models/entities/session.entity'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSessionDto } from '../dto/create-session.dto'
import { User } from '@/common/models/entities/user.entity'

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
}
