import { Instructor } from '@/common/models/entities/instructor.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { FetchInstructorDto } from '../dto/fetch-instructor.dto'
import {
  PaginationResult,
  PaginationService,
} from '@/common/pagination/pagination.service'
import { paginationParamsFormula } from '@/common/utils/pagination-formula.utils'

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
    private readonly paginationService: PaginationService,
  ) {}

  async countTotalLearner() {
    const result = await this.instructorRepository
      .createQueryBuilder('instructor')
      .getCount()

    return {
      value: result,
    }
  }

  async listAllInstructor(
    query: FetchInstructorDto,
  ): Promise<PaginationResult<DeepPartial<Instructor>>> {
    const paginationParams = paginationParamsFormula(query)
    const qb = this.instructorRepository
      .createQueryBuilder('instructor')
      .leftJoinAndSelect('instructor.skillLink', 'skillLink')
      .leftJoinAndSelect('skillLink.skill', 'skill')
      .innerJoinAndSelect('instructor.user', 'user')

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = data.map((instructor) => {
      const skill = instructor.skillLink.map((skillLink) => {
        return { id: skillLink.skill.id, title: skillLink.skill.title }
      })
      return {
        id: instructor.user.id,
        fullName: instructor.user.fullName,
        email: instructor.user.email,
        phone: instructor.user.phone,
        isActive: instructor.user.isActive,
        learnerId: instructor.user.learnerId ? instructor.user.learnerId : null,
        ...instructor.user.learner,
        skill,
      }
    })

    return {
      data: mappedData,
      pagination,
    }
  }
}
