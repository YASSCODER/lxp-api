import { Skill } from '@/common/models/entities/skills.entity'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSkillDto } from '../dto/create-skill.dto'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { FetchSkillAsListItemDto, FetchSkillDto } from '../dto/fetch-skill.dto'
import { paginationParamsFormula } from '@/common/utils/pagination-formula.utils'
import {
  PaginationResult,
  PaginationService,
} from '@/common/pagination/pagination.service'
import { S3Service } from '@/common/aws/service/s3.service'
import { applySkillFilter } from '../helper/filter.helper'
import {
  getCreateSuccessMessage,
  getDeleteSuccessMessage,
} from '@/common/utils/success-messages.utils'

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    private readonly paginationService: PaginationService,
    private readonly s3Service: S3Service,
  ) {}

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

      return getCreateSuccessMessage({
        entityName: 'skill',
        entityId: skillSaved.id,
      })
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

  async listSkillsAsItems(payload: FetchSkillAsListItemDto) {
    const qb = this.skillRepository.createQueryBuilder('skill')
    qb.limit(10)
    applySkillFilter(qb, payload)
    const data = await qb.getMany()

    const mappedSkillData = data.map((skill) => ({
      id: skill.id,
      title: skill.title,
    }))

    return {
      data: mappedSkillData,
    }
  }

  async deleteSkill(id: number) {
    console.log(id)
    const skillFound = await this.skillRepository.findOneOrFail({
      where: { id },
    })
    await this.skillRepository.softRemove(skillFound)

    return getDeleteSuccessMessage({
      entityName: 'skill',
      entityId: skillFound.id,
    })
  }
}
