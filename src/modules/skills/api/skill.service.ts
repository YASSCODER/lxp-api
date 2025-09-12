import { Skill } from '@/common/models/entities/skills.entity'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSkillDto } from '../dto/create-skill.dto'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
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
}
