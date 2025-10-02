import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { LearnPathService } from './learn-path.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { Roles } from '@/auth/decorators/roles.decorator'
import { UserRole } from '@/common/enum/user-role.enum'
import { CreateLearnPathDto } from '../dto/craete-learn-path.dto'
import {
  FetchLearnPathAsItem,
  FetchLearnPathDto,
} from '../dto/fetch-learning-path.dto'
import { User } from '@/common/models/entities/user.entity'

@Controller('learn-path')
export class LearnPathController {
  constructor(private readonly learnPathService: LearnPathService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createLearnPath(
    @Body() payload: CreateLearnPathDto,
    @Req() req: { user: User },
    @Ip() ip: string,
  ) {
    return await this.learnPathService.createLearnPath(payload, req.user, ip)
  }

  @Get('list-all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async listAllLearnPath(@Query() payload: FetchLearnPathDto) {
    return await this.learnPathService.listAllLearnPaths(payload)
  }

  @Get('list-items')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR, UserRole.LEARNER)
  async listLearnPathItems(@Query() query: FetchLearnPathAsItem) {
    return await this.learnPathService.listLearnPathItem(query)
  }
}
