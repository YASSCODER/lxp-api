import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Instructor } from '@/common/models/entities/instructor.entity'
import { InstructorService } from './api/instructor.service'
import { InstructorController } from './api/instructor.controller'
import { PaginationService } from '@/common/pagination/pagination.service'

@Module({
  imports: [TypeOrmModule.forFeature([Instructor])],
  providers: [InstructorService, PaginationService],
  controllers: [InstructorController],
})
export class InstructorModule {}
