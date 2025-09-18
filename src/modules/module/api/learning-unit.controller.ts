import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UserRole } from '@/common/enum/user-role.enum'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { LearningUnitService } from './learning-unit.service'
import { Roles } from '@/auth/decorators/roles.decorator'
import { CreateModuleDto } from '../dto/craete-module.dto'
import { UpdateModuleDto } from '../dto/update-module.dto'
import { FetchModuleAsListItemDto } from '../dto/fetch-module.dto'

@Controller('module')
export class LearningUnitController {
  constructor(private readonly moduleService: LearningUnitService) {}

  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createModule(@Body() payload: CreateModuleDto) {
    return await this.moduleService.createModule(payload)
  }

  @Patch(':moduleId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateModule(
    @Param('moduleId') moduleId: number,
    @Body() payload: UpdateModuleDto,
  ) {
    return await this.moduleService.updateModule(moduleId, payload)
  }

  @Delete(':moduleId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteModule(@Param('moduleId') moduleId: number) {
    return await this.moduleService.deleteModule(moduleId)
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
