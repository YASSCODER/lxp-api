import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { SkillService } from './skill.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { Roles } from '@/auth/decorators/roles.decorator'
import { UserRole } from '@/common/enum/user-role.enum'
import { CreateSkillDto } from '../dto/create-skill.dto'
import { FetchSkillDto } from '../dto/fetch-skill.dto'

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
}
