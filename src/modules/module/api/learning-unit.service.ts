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

@Injectable()
export class LearningUnitService {
  constructor(
    @InjectRepository(LearningUnit)
    private readonly moduleRepository: Repository<LearningUnit>,
  ) {}

  async createModule(payload: CreateModuleDto) {
    const moduleEntity = this.moduleRepository.create({ ...payload })
    const savedModule = await this.moduleRepository.save(moduleEntity)

    return getCreateSuccessMessage({
      entityName: 'module',
      entityId: savedModule.id,
    })
  }

  async updateModule(id: number, payload: UpdateModuleDto) {
    await this.moduleRepository.update(id, payload)

    return getUpdateSuccessMessage({
      entityName: 'module',
      entityId: id,
    })
  }

  async deleteModule(id: number) {
    await this.moduleRepository.delete(id)

    return getDeleteSuccessMessage({
      entityName: 'module',
      entityId: id,
    })
  }
}
