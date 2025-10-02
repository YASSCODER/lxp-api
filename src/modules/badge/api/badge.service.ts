import { Badge } from '@/common/models/entities/badge.entity'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateBadgeDto } from '../dto/create-badge.dto'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { User } from '@/common/models/entities/user.entity'
import { UserLogService } from '@/modules/user-log/api/user-log.service'
import { LogStatus } from '@/common/enum/logs-status.enum'
import { createUserLogData } from '@/modules/user-log/helper/user-log.helper'

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
    private readonly userLogService: UserLogService,
  ) {}

  async createBadge(payload: CreateBadgeDto, user: User, ip: string) {
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

      const action = `${user.email} has created a badge with id: ${badgeSaved.id}`
      this.userLogService.saveUserLog(
        createUserLogData(badgeSaved.id, action, LogStatus.SUCCESS, ip),
      )

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
