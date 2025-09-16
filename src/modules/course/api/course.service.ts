import { S3Service } from '@/common/aws/service/s3.service'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { Course } from '@/common/models/entities/course.entity'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { getCreateSuccessMessage } from '@/common/utils/success-messages.utils'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCourseDto } from '../dto/craete-course.dto'
import { User } from '@/common/models/entities/user.entity'
import { LearnerCourseLinker } from '@/common/models/entities/learner-course-linker.entity'

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(LearnerCourseLinker)
    private readonly learnerCourseLinkRepository: Repository<LearnerCourseLinker>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCourse(payload: CreateCourseDto) {
    const exist = await this.courseRepository
      .createQueryBuilder('course')
      .where("course.title->>'en' = :en", { en: payload.title.en })
      .orWhere("course.title->>'ar' = :ar", { ar: payload.title.ar })
      .getOne()

    if (exist) {
      throwFormValidationError({
        errorCode: ErrorCodes.TITLE_EXISTS,
        title: {
          message: {
            en: 'Course with this title already exists',
            ar: 'الدورة بهذا العنوان موجودة بالفعل',
          },
        },
      })
    }

    const courseEntity = this.courseRepository.create({ ...payload })

    const courseSaved = await this.courseRepository.save(courseEntity)

    return getCreateSuccessMessage({
      entityName: 'Course',
      entityId: courseSaved.id,
    })
  }

  async markAsCompleted(courseId: number, user: User) {
    const userFound = await this.userRepository.findOne({
      where: { id: user.id },
    })

    if (!userFound) {
      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        id: {
          message: {
            en: `user with id : ${user.id} not found`,
            ar: `المستخدم بالمعرّف: ${user.id} غير موجود`,
          },
        },
      })
    }

    const courseFound = await this.courseRepository.findOne({
      where: {
        id: courseId,
      },
    })

    if (!courseFound) {
      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        id: {
          message: {
            en: `course with id : ${courseId} not found`,
            ar: `الدورة بالمعرّف: ${courseId} غير موجودة`,
          },
        },
      })
    }

    const learnerCourseLinkFound =
      await this.learnerCourseLinkRepository.findOne({
        where: {
          courseId,
        },
      })

    await this.learnerCourseLinkRepository.update(learnerCourseLinkFound.id, {
      completed: true,
    })

    return {
      status: HttpStatus.OK,
      message: {
        en: 'course completed',
        ar: 'تم إكمال الدورة بنجاح',
      },
    }
  }
}
