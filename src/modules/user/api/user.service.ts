import { User } from '@/common/models/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dto/create-user.dto'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { HttpStatus } from '@nestjs/common'
import { Role } from '@/common/models/entities/role.entity'
import { UserRole } from '@/common/enum/user-role.enum'

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createAdminUser(payload: CreateUserDto) {
    const roleFound = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.title->>en = :name', { name: UserRole.ADMIN })
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

    const adminEntity = this.userRepository.create({
      ...payload,
      roleId: roleFound.id,
      role: roleFound,
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
}
