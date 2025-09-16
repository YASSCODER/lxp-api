import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { SkillService } from './skill.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { Roles } from '@/auth/decorators/roles.decorator'
import { UserRole } from '@/common/enum/user-role.enum'
import { CreateSkillDto } from '../dto/create-skill.dto'
import { FetchSkillAsListItemDto, FetchSkillDto } from '../dto/fetch-skill.dto'
import { User } from '@/common/models/entities/user.entity'
import { AssignSkillToLearner } from '../dto/assign-skill-learner.dto'

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createSkill(@Body() payload: CreateSkillDto) {
    return await this.skillService.createSkill(payload)
  }

  @Get('paginate')
  async listAllSkills(@Query() payload: FetchSkillDto) {
    return await this.skillService.listAllSkillsWithPagination(payload)
  }

  @Get('list')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR, UserRole.LEARNER)
  async listSkills(@Query() payload: FetchSkillAsListItemDto) {
    return await this.skillService.listSkillsAsItems(payload)
  }

  @Delete(':skillId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteSkill(@Param('skillId') skillId: number) {
    return await this.skillService.deleteSkill(skillId)
  }

  @Post('assign-learner')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LEARNER)
  async assignSkillToLearner(
    @Req() req: { user: User },
    @Body() payload: AssignSkillToLearner,
  ) {
    return await this.skillService.assignSkillToLearner(req.user, payload)
  }
}
