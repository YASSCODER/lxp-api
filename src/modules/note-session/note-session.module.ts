import { SessionNotes } from '@/common/models/entities/sessionNotes.entity'
import { Session } from '@/common/models/entities/session.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NoteSessionController } from './api/note-session.controller'
import { NoteSessionService } from './api/note-session.service'

@Module({
  imports: [TypeOrmModule.forFeature([SessionNotes, Session])],
  controllers: [NoteSessionController],
  providers: [NoteSessionService],
})
export class NoteSessionModule {}
