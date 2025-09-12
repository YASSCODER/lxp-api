import { Role } from '@/common/models/entities/role.entity'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@/common/models/entities/user.entity'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserServiceSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  logger = new Logger('User Service Seeder initiated')

  async seedDataBaseWithAdmin() {
    const adminRole = await this.roleRepository
      .createQueryBuilder('role')
      .where("role.title->>'en' = :name", { name: 'ADMIN' })
      .getOne()

    if (!adminRole) {
      this.logger.error('ADMIN role not found. Please run role seeder first.')
      return
    }

    const existingAdmin = await this.userRepository.findOne({
      where: { email: 'admin@lxp.com' },
    })

    if (existingAdmin) {
      this.logger.log('Admin user already exists')
      return
    }

    const hashedPassword = await bcrypt.hash('admin123', 10)

    const adminUser = this.userRepository.create({
      email: 'admin@lxp.com',
      password: hashedPassword,
      fullName: 'System Administrator',
      phone: '+1234567890',
      roleId: adminRole.id,
      isActive: true,
    })

    await this.userRepository.save(adminUser)

    this.logger.log('Admin user created successfully')
    this.logger.log('Email: admin@lxp.com')
    this.logger.log('Password: admin123')
    this.logger.log(`User seeder closed`)
  }
}
