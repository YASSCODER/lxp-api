import { Controller, Post } from '@nestjs/common'
import { RoleServiceSeeder } from './role.service'

@Controller('role/seeder')
export class RoleControllerSeeder {
  constructor(private readonly roleServiceSeeder: RoleServiceSeeder) {}

  @Post('seeding-db')
  async seedRolesInDb() {
    return await this.roleServiceSeeder.seedDataBaseWithRoles()
  }
}
