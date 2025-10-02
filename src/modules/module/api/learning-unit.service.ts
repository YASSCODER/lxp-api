import { LearningUnit } from '@/common/models/entities/module.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateModuleDto } from '../dto/craete-module.dto'
import {
  getCreateSuccessMessage,
  getUpdateSuccessMessage,
  getDeleteSuccessMessage,
} from '@/common/utils/success-messages.utils'
import { UpdateModuleDto } from '../dto/update-module.dto'
import { FetchModuleAsListItemDto } from '../dto/fetch-module.dto'
import { applyModuleFilter } from '../helper/module-filter.helper'
import { User } from '@/common/models/entities/user.entity'
import { LogStatus } from '@/common/enum/logs-status.enum'
import { createUserLogData } from '@/modules/user-log/helper/user-log.helper'
import { UserLogService } from '@/modules/user-log/api/user-log.service'

@Injectable()
export class LearningUnitService {
  constructor(
    @InjectRepository(LearningUnit)
    private readonly moduleRepository: Repository<LearningUnit>,
    private readonly userLogService: UserLogService,
  ) {}

  async createModule(payload: CreateModuleDto, user: User, ip: string) {
    const moduleEntity = this.moduleRepository.create({ ...payload })
    const savedModule = await this.moduleRepository.save(moduleEntity)

    const action = `${user.email} has created a module with id: ${savedModule.id}`
    this.userLogService.saveUserLog(
      createUserLogData(savedModule.id, action, LogStatus.SUCCESS, ip),
    )

    return getCreateSuccessMessage({
      entityName: 'module',
      entityId: savedModule.id,
    })
  }

  async updateModule(
    id: number,
    payload: UpdateModuleDto,
    user: User,
    ip: string,
  ) {
    await this.moduleRepository.update(id, payload)

    const action = `${user.email} has updated a module with id: ${id}`
    this.userLogService.saveUserLog(
      createUserLogData(id, action, LogStatus.SUCCESS, ip),
    )

    return getUpdateSuccessMessage({
      entityName: 'module',
      entityId: id,
    })
  }

  async deleteModule(id: number, user: User, ip: string) {
    await this.moduleRepository.delete(id)

    const action = `${user.email} has deleted a module with id: ${id}`
    this.userLogService.saveUserLog(
      createUserLogData(id, action, LogStatus.SUCCESS, ip),
    )

    return getDeleteSuccessMessage({
      entityName: 'module',
      entityId: id,
    })
  }

  async listModuleAsItems(payload: FetchModuleAsListItemDto) {
    const qb = this.moduleRepository.createQueryBuilder('module')
    qb.limit(10)
    applyModuleFilter(qb, payload)
    const data = await qb.getMany()

    const mappedSkillData = data.map((skill) => ({
      id: skill.id,
      title: skill.title,
    }))

    return {
      data: mappedSkillData,
    }
  }

  async getTotalCount() {
    const result = await this.moduleRepository
      .createQueryBuilder('learningUnit')
      .getCount()

    return {
      value: result,
    }
  }
}
