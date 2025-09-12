import { Controller, Post } from '@nestjs/common'
import { UserServiceSeeder } from './user.service'

@Controller('user/seeder')
export class UserControllerSeeder {
  constructor(private readonly userServiceSeeder: UserServiceSeeder) {}

  @Post('seeding-admin')
  async seedAdminInDb() {
    return await this.userServiceSeeder.seedDataBaseWithAdmin()
  }
}
