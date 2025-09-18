import { Learner } from '@/common/models/entities/learner.entity'
import {
  PaginationResult,
  PaginationService,
} from '@/common/pagination/pagination.service'
import { paginationParamsFormula } from '@/common/utils/pagination-formula.utils'
import { FetchUserDto } from '@/modules/user/dto/fetch-user.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { FetchLearnerDto } from '../dto/fetch-learner.dto'

@Injectable()
export class LearnerService {
  constructor(
    @InjectRepository(Learner)
    private readonly learnerRepository: Repository<Learner>,
    private readonly paginationService: PaginationService,
  ) {}

  async countTotalLearner() {
    const result = await this.learnerRepository
      .createQueryBuilder('learner')
      .getCount()
    return {
      value: result,
    }
  }

  async listAllLearner(
    query: FetchLearnerDto,
  ): Promise<PaginationResult<DeepPartial<Learner>>> {
    const paginationParams = paginationParamsFormula(query)
    const qb = this.learnerRepository
      .createQueryBuilder('learner')
      .innerJoinAndSelect('learner.user', 'user')

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = data.map((learner) => {
      return {
        id: learner.user.id,
        fullName: learner.user.fullName,
        email: learner.user.email,
        phone: learner.user.phone,
        isActive: learner.user.isActive,
        learnerId: learner.user.learnerId ? learner.user.learnerId : null,
        ...(learner.user.learner && {
          roi: learner.user.learner.roi,
          score: learner.user.learner.score,
        }),
      }
    })

    return {
      data: mappedData,
      pagination,
    }
  }
}
