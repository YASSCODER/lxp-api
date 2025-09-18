import { User } from '@/common/models/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { CreateUserDto } from '../dto/create-user.dto'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { HttpStatus } from '@nestjs/common'
import { Role } from '@/common/models/entities/role.entity'
import { UserRole } from '@/common/enum/user-role.enum'
import { FetchUserDto } from '../dto/fetch-user.dto'
import { paginationParamsFormula } from '@/common/utils/pagination-formula.utils'
import {
  PaginationResult,
  PaginationService,
} from '@/common/pagination/pagination.service'
import * as bcrypt from 'bcryptjs'

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly paginationService: PaginationService,
  ) {}

  async createAdminUser(payload: CreateUserDto) {
    const roleFound = await this.roleRepository
      .createQueryBuilder('role')
      .where("role.title->>'en' = :name", { name: UserRole.ADMIN })
      .getOne()

    const userFoundByPhone = await this.userRepository.findOne({
      where: {
        phone: payload.phone,
      },
    })

    const userFoundByEmail = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    })

    if (userFoundByEmail || userFoundByPhone) {
      throwFormValidationError({
        status: ErrorCodes.ENTITY_ALREADY_FOUND,
        message: {
          en: `user already exist`,
          ar: `المستخدم موجود مسبقًا`,
        },
      })
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10)

    const adminEntity = this.userRepository.create({
      ...payload,
      roleId: roleFound.id,
      role: roleFound,
      password: hashedPassword,
    })

    const savedAdmin = await this.userRepository.save(adminEntity)

    return {
      status: HttpStatus.CREATED,
      message: {
        en: `admin created with id : ${savedAdmin.id}`,
        ar: `تم إنشاء المشرف بالمعرّف: ${savedAdmin.id}`,
      },
    }
  }

  async CountTotalUsers() {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .getCount()

    return {
      value: result,
    }
  }

  async getTotalAdmin() {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .where('user.learnerId IS NULL')
      .andWhere('user.instructorId IS NULL')
      .getCount()

    return {
      value: result,
    }
  }

  async listAllUsers(
    query: FetchUserDto,
  ): Promise<PaginationResult<DeepPartial<User>>> {
    const paginationParams = paginationParamsFormula(query)
    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.learner', 'learner')
      .leftJoinAndSelect('user.instructor', 'instructor')
      .leftJoinAndSelect('user.role', 'role')

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = data.map((user) => {
      return {
        id: user.id,
        fullName: user.fullName,
        role: {
          title: user.role.title,
        },
        email: user.email,
        phone: user.phone,
        isActive: user.isActive,
        learnerId: user.learnerId ? user.learnerId : null,
        instructorId: user.instructorId ? user.instructorId : null,
        ...(user.instructor && {
          isVerified: user.instructor.isVerified,
          rating: user.instructor.rating,
        }),
        ...(user.learner && {
          roi: user.learner.roi,
          score: user.learner.score,
        }),
      }
    })

    return {
      data: mappedData,
      pagination,
    }
  }

  async listAllAdmin(
    query: FetchUserDto,
  ): Promise<PaginationResult<DeepPartial<User>>> {
    const paginationParams = paginationParamsFormula(query)
    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.learnerId IS NULL')
      .andWhere('user.instructorId IS NULL')

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = data.map((user) => {
      return {
        id: user.id,
        fullName: user.fullName,
        role: {
          title: user.role.title,
        },
        email: user.email,
        phone: user.phone,
        isActive: user.isActive,
      }
    })

    return {
      data: mappedData,
      pagination,
    }
  }
}
