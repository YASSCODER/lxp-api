import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { InstructorService } from './instructor.service'
import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UserRole } from '@/common/enum/user-role.enum'
import { FetchInstructorDto } from '../dto/fetch-instructor.dto'

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get('total-instructor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getTotalLearner() {
    return await this.instructorService.countTotalLearner()
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async listAllLearner(@Query() payload: FetchInstructorDto) {
    return await this.instructorService.listAllInstructor(payload)
  }
}
