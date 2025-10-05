import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Instructor } from '@/common/models/entities/instructor.entity'
import { InstructorService } from './api/instructor.service'
import { InstructorController } from './api/instructor.controller'
import { PaginationService } from '@/common/pagination/pagination.service'
import { UserLogService } from '../user-log/api/user-log.service'
import { UserLog } from '@/common/models/entities/user-log.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Instructor, UserLog])],
  providers: [InstructorService, PaginationService, UserLogService],
  controllers: [InstructorController],
})
export class InstructorModule {}
