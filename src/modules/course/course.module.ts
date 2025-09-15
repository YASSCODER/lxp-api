import { Course } from '@/common/models/entities/course.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CourseService } from './api/course.service'
import { PaginationService } from '@/common/pagination/pagination.service'
import { CourseController } from './api/course.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseService, PaginationService],
  controllers: [CourseController],
  exports: [],
})
export class CourseModule {}
