import { Role } from '@/common/models/entities/role.entity'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Admin, Repository } from 'typeorm'
import { IName } from './interface/name.interface'

@Injectable()
export class RoleServiceSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  logger = new Logger('RoleServiceSeeder initiated')
  async seedDataBaseWithRoles() {
    const adminRole = {
      title: {
        en: 'ADMIN',
        ar: 'مشرف',
      },
    }
    const learnerRole = {
      title: {
        en: 'LEARNER',
        ar: 'متعلم',
      },
    }
    const instructorRole = {
      title: {
        en: 'INSTRUCTOR',
        ar: 'مدرّس',
      },
    }

    const viewerRole = {
      title: {
        en: 'VIEWER',
        ar: 'مشاهد',
      },
    }

    const roleToAdd = [adminRole, learnerRole, instructorRole, viewerRole]

    for (const role of roleToAdd) {
      const existingRole = await this.roleRepository
        .createQueryBuilder('role')
        .where("role.title->>'en' = :name", { name: role.title.en })
        .getOne()

      this.logger.debug(
        `existing role: ${existingRole ? `${existingRole.title.en} (${existingRole.title.ar})` : 'none'}`,
      )

      if (!existingRole) {
        const roleCreated = this.roleRepository.create(role)

        this.logger.log(`role with ${role.title.en} created`)

        await this.roleRepository.save(roleCreated)

        this.logger.log(`role with ${role.title.en} saved `)
      }
    }
    this.logger.log(`Role seeder closed`)
  }
}
