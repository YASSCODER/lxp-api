import { Course } from '@/common/models/entities/course.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CourseService } from './api/course.service'
import { PaginationService } from '@/common/pagination/pagination.service'
import { CourseController } from './api/course.controller'
import { User } from '@/common/models/entities/user.entity'
import { LearnerCourseLinker } from '@/common/models/entities/learner-course-linker.entity'
import { LearnerLearnPath } from '@/common/models/entities/learner-learn-path-link.entity'
import { LearnPath } from '@/common/models/entities/learn-path.entity'
import { UserLogService } from '../user-log/api/user-log.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      User,
      LearnerCourseLinker,
      LearnPath,
      LearnerLearnPath,
    ]),
  ],
  providers: [CourseService, PaginationService, UserLogService],
  controllers: [CourseController],
  exports: [],
})
export class CourseModule {}
