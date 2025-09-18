import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { LearnerService } from './learner.service'
import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UserRole } from '@/common/enum/user-role.enum'
import { FetchLearnerDto } from '../dto/fetch-learner.dto'

@Controller('learner')
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Get('total-learner')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getTotalLearner() {
    return await this.learnerService.countTotalLearner()
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async listAllLearner(@Query() payload: FetchLearnerDto) {
    return await this.learnerService.listAllLearner(payload)
  }
}
