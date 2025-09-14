import { Skill } from '@/common/models/entities/skills.entity'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSkillDto } from '../dto/create-skill.dto'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { FetchSkillDto } from '../dto/fetch-skill.dto'
import { paginationParamsFormula } from '@/common/utils/pagination-formula.utils'
import {
  PaginationResult,
  PaginationService,
} from '@/common/pagination/pagination.service'
import { v4 as uuid } from 'uuid'
import { S3Service } from '@/common/aws/service/s3.service'

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    private readonly paginationService: PaginationService,
    private readonly s3Service: S3Service,
  ) {}

  async uploadImage(file: Express.Multer.File) {
    const key = uuid()
    const contentType = file.mimetype

    await this.s3Service.uploadFile(key, file.buffer, contentType)
    const fileName = file.filename || file.originalname || key
    const url = await this.s3Service.generateSignedDownloadUrl(key)

    return {
      key,
      fileName,
      url,
    }
  }

  async createSkill(payload: CreateSkillDto) {
    try {
      const existingSkill = await this.skillRepository
        .createQueryBuilder('skill')
        .where("skill.title->>'en' = :enTitle", { enTitle: payload.title.en })
        .orWhere("skill.title->>'ar' = :arTitle", { arTitle: payload.title.ar })
        .getOne()

      if (existingSkill) {
        throwFormValidationError({
          errorCode: ErrorCodes.ENTITY_ALREADY_FOUND,
          message: {
            en: `skill already exists`,
            ar: `المهارة موجودة بالفعل`,
          },
        })
      }

      const skillEntity = this.skillRepository.create({ ...payload })
      const skillSaved = await this.skillRepository.save(skillEntity)

      return {
        status: HttpStatus.CREATED,
        message: {
          en: `skill saved with id : ${skillSaved.id}`,
          ar: `تم حفظ المهارة بالمعرّف: ${skillSaved.id}`,
        },
      }
    } catch (error) {
      if (error.errorCode === ErrorCodes.ENTITY_ALREADY_FOUND) {
        throw error
      }

      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        message: {
          en: `Failed to create skill`,
          ar: `فشل في إنشاء المهارة`,
        },
      })
    }
  }

  async listAllSkillsWithPagination(
    payload: FetchSkillDto,
  ): Promise<PaginationResult<Partial<Skill>>> {
    const paginationParams = paginationParamsFormula(payload)

    const qb = this.skillRepository
      .createQueryBuilder('skill')
      .leftJoinAndSelect('skill.modules', 'module')
      .leftJoinAndSelect('module.learnPaths', 'learnPath')

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = await Promise.all(
      data.map(async (skill) => {
        const image = await this.s3Service.generateSignedDownloadUrl(
          skill.file.key,
        )
        const module = await Promise.all(
          skill.modules.map(async (module) => {
            const image = await this.s3Service.generateSignedDownloadUrl(
              module.file.key,
            )
            return {
              id: module.id,
              title: module.title,
              image,
            }
          }),
        )
        return {
          id: skill.id,
          title: skill.title,
          description: skill.description,
          image,
          module,
        }
      }),
    )

    return {
      data: mappedData,
      pagination,
    }
  }
}
