import { S3Service } from '@/common/aws/service/s3.service'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { Course } from '@/common/models/entities/course.entity'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { getCreateSuccessMessage } from '@/common/utils/success-messages.utils'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCourseDto } from '../dto/craete-course.dto'

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
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
}
