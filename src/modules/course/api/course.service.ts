import { S3Service } from '@/common/aws/service/s3.service'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { Course } from '@/common/models/entities/course.entity'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { getCreateSuccessMessage } from '@/common/utils/success-messages.utils'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreateCourseDto } from '../dto/craete-course.dto'
import { User } from '@/common/models/entities/user.entity'
import { LearnerCourseLinker } from '@/common/models/entities/learner-course-linker.entity'
import { LearnPath } from '@/common/models/entities/learn-path.entity'
import { LearnerLearnPath } from '@/common/models/entities/learner-learn-path-link.entity'
import { createUserLogData } from '@/modules/user-log/helper/user-log.helper'
import { LogStatus } from '@/common/enum/logs-status.enum'
import { UserLogService } from '@/modules/user-log/api/user-log.service'

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(LearnerCourseLinker)
    private readonly learnerCourseLinkRepository: Repository<LearnerCourseLinker>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LearnPath)
    private readonly learnPathRepository: Repository<LearnPath>,
    @InjectRepository(LearnerLearnPath)
    private readonly learnerLearnPathLinkRepository: Repository<LearnerLearnPath>,
    private readonly userLogService: UserLogService,
  ) {}

  async createCourse(payload: CreateCourseDto, user: User, ip: string) {
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

    const action = `${user.email} has created a course with id: ${courseSaved.id}`
    this.userLogService.saveUserLog(
      createUserLogData(courseSaved.id, action, LogStatus.SUCCESS, ip),
    )

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
      relations: {
        learnPath: true,
      },
    })

    const learnPathFound = await this.learnPathRepository.findOne({
      where: { id: courseFound.learnPathId },
      relations: {
        courses: true,
      },
    })

    if (!learnPathFound) {
      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        message: {
          en: `learn path with id: ${courseFound.learnPathId} not found`,
        },
      })
    }

    const learnerLearnPathLink =
      await this.learnerLearnPathLinkRepository.findOne({
        where: {
          learnPathId: learnPathFound.id,
        },
      })

    const courseIds = learnPathFound.courses.map((c) => c.id)

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

    const isLast = courseIds[courseIds.length - 1] === courseFound.id

    if (isLast) {
      await this.learnerLearnPathLinkRepository.update(
        learnerLearnPathLink.id,
        {
          completed: true,
          progress: 100,
        },
      )
    }

    return {
      status: HttpStatus.OK,
      message: {
        en: 'course completed',
        ar: 'تم إكمال الدورة بنجاح',
      },
    }
  }

  async getTotalCount() {
    const result = await this.courseRepository
      .createQueryBuilder('course')
      .getCount()

    return {
      value: result,
    }
  }
}
