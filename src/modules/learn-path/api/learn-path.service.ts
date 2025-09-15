import { LearnPath } from '@/common/models/entities/learn-path.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { CreateLearnPathDto } from '../dto/craete-learn-path.dto'
import { getCreateSuccessMessage } from '@/common/utils/success-messages.utils'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import {
  FetchLearnPathAsItem,
  FetchLearnPathDto,
} from '../dto/fetch-learning-path.dto'
import {
  PaginationResult,
  PaginationService,
} from '@/common/pagination/pagination.service'
import { paginationParamsFormula } from '@/common/utils/pagination-formula.utils'
import { applyLearnPathFilter } from '../helper/learn-path.helper'
import { S3Service } from '@/common/aws/service/s3.service'

@Injectable()
export class LearnPathService {
  constructor(
    @InjectRepository(LearnPath)
    private readonly learnPathRepository: Repository<LearnPath>,
    private readonly paginationService: PaginationService,
    private readonly s3Service: S3Service,
  ) {}

  async createLearnPath(payload: CreateLearnPathDto) {
    const exists = await this.learnPathRepository
      .createQueryBuilder('lp')
      .where("lp.title->>'en' = :en", { en: payload.title.en })
      .orWhere("lp.title->>'ar' = :ar", { ar: payload.title.ar })
      .getOne()

    if (exists) {
      throwFormValidationError({
        codeError: ErrorCodes.TITLE_EXISTS,
        title: {
          message: {
            en: 'A learning path with this title already exists',
            ar: 'مسار تعلّم بهذا العنوان موجود بالفعل',
          },
        },
      })
    }

    const learnPathEntity = this.learnPathRepository.create({ ...payload })

    const LearnPath = await this.learnPathRepository.save(learnPathEntity)

    return getCreateSuccessMessage({
      entityName: 'LearnPath',
      entityId: LearnPath.id,
    })
  }

  async listAllLearnPaths(
    payload: FetchLearnPathDto,
  ): Promise<PaginationResult<DeepPartial<LearnPath>>> {
    const paginationParams = paginationParamsFormula(payload)

    const qb = this.learnPathRepository
      .createQueryBuilder('lp')
      .leftJoinAndSelect('lp.courses', 'course')
      .leftJoinAndSelect('lp.module', 'module')
      .leftJoinAndSelect('module.skill', 'skill')

    applyLearnPathFilter(qb, payload)

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = data.map((lp) => {
      const course = lp.courses.map(async (course) => ({
        id: course.id,
        title: course.title,
        image: await this.s3Service.generateSignedDownloadUrl(course.file.key),
      }))

      return {
        id: lp.id,
        title: lp.title,
        description: lp.description,
        module: {
          id: lp.module.id,
          title: lp.module.title,
          description: lp.module.description,
          skill: {
            id: lp.module.skill.id,
            title: lp.module.skill.title,
          },
        },
        course: lp.courses.length ? course : null,
      }
    })

    return {
      data: mappedData,
      pagination,
    }
  }

  async listLearnPathItem(query: FetchLearnPathAsItem) {
    const qb = this.learnPathRepository.createQueryBuilder('lp')
    qb.limit(10)
    applyLearnPathFilter(qb, query)
    const data = await qb.getMany()

    const mappedLearnPathData = data.map((lp) => ({
      id: lp.id,
      title: lp.title,
    }))

    return {
      data: mappedLearnPathData,
    }
  }
}
