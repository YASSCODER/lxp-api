import { Badge } from '@/common/models/entities/badge.entity'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateBadgeDto } from '../dto/create-badge.dto'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
  ) {}

  async createBadge(payload: CreateBadgeDto) {
    try {
      const existingBadge = await this.badgeRepository
        .createQueryBuilder('badge')
        .where('badge.title = :title', { title: payload.title })
        .getOne()

      if (existingBadge) {
        throwFormValidationError({
          errorCode: ErrorCodes.ENTITY_ALREADY_FOUND,
          message: {
            en: `badge already exists`,
            ar: `الشارة موجودة بالفعل`,
          },
        })
      }

      const badgeEntity = this.badgeRepository.create({ ...payload })
      const badgeSaved = await this.badgeRepository.save(badgeEntity)

      return {
        status: HttpStatus.CREATED,
        message: {
          en: `badge saved with id : ${badgeSaved.id}`,
          ar: `تم حفظ الشارة بالمعرّف: ${badgeSaved.id}`,
        },
      }
    } catch (error) {
      if (error.errorCode === ErrorCodes.ENTITY_ALREADY_FOUND) {
        throw error
      }

      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        message: {
          en: `Failed to create badge`,
          ar: `فشل في إنشاء الشارة`,
        },
      })
    }
  }
}
