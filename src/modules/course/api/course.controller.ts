import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CourseService } from './course.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UserRole } from '@/common/enum/user-role.enum'
import { Roles } from '@/auth/decorators/roles.decorator'
import { CreateCourseDto } from '../dto/craete-course.dto'

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createCourse(@Body() payload: CreateCourseDto) {
    return this.courseService.createCourse(payload)
  }
}
