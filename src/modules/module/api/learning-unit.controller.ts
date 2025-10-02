import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UserRole } from '@/common/enum/user-role.enum'
import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { LearningUnitService } from './learning-unit.service'
import { Roles } from '@/auth/decorators/roles.decorator'
import { CreateModuleDto } from '../dto/craete-module.dto'
import { UpdateModuleDto } from '../dto/update-module.dto'
import { FetchModuleAsListItemDto } from '../dto/fetch-module.dto'
import { User } from '@/common/models/entities/user.entity'

@Controller('module')
export class LearningUnitController {
  constructor(private readonly moduleService: LearningUnitService) {}

  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createModule(
    @Body() payload: CreateModuleDto,
    @Req() req: { user: User },
    @Ip() ip: string,
  ) {
    return await this.moduleService.createModule(payload, req.user, ip)
  }

  @Patch(':moduleId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateModule(
    @Param('moduleId') moduleId: number,
    @Body() payload: UpdateModuleDto,
    @Req() req: { user: User },
    @Ip() ip: string,
  ) {
    return await this.moduleService.updateModule(
      moduleId,
      payload,
      req.user,
      ip,
    )
  }

  @Delete(':moduleId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteModule(
    @Param('moduleId') moduleId: number,
    @Req() req: { user: User },
    @Ip() ip: string,
  ) {
    return await this.moduleService.deleteModule(moduleId, req.user, ip)
  }

  @Get('list')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR, UserRole.LEARNER)
  async listSkills(@Query() payload: FetchModuleAsListItemDto) {
    return await this.moduleService.listModuleAsItems(payload)
    return await this.moduleService.getTotalCount()
  }

  @Get('total-count')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getTotalCount() {
    return await this.moduleService.getTotalCount()
  }
}
