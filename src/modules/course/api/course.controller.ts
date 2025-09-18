import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CourseService } from './course.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UserRole } from '@/common/enum/user-role.enum'
import { Roles } from '@/auth/decorators/roles.decorator'
import { CreateCourseDto } from '../dto/craete-course.dto'
import { User } from '@/common/models/entities/user.entity'

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createCourse(@Body() payload: CreateCourseDto) {
    return this.courseService.createCourse(payload)
  }

  @Patch('completed/:courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LEARNER)
  async markAsCompleted(
    @Param('courseId') courseId: number,
    @Req() req: { user: User },
  ) {
    return await this.courseService.markAsCompleted(courseId, req.user)
  }

  @Get('total-count')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getTotalCourse(){
    return await this.courseService.getTotalCount()
  }
}
