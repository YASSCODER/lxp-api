import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { OnboardingService } from './onboarding.service'
import { PaginationDto } from '@/common/dto/pagination.dto'
import { User } from '@/common/models/entities/user.entity'
import { CreateUserAnswerOnboardingDto } from '../dto/create-user-answer.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { Roles } from '@/auth/decorators/roles.decorator'
import { UserRole } from '@/common/enum/user-role.enum'
import { RolesGuard } from '@/auth/guards/roles.guard'

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('questions')
  async getOnboardingQuestionsWithAnswers(@Query() query: PaginationDto) {
    return this.onboardingService.getOnboardingQuestionsWithAnswers(query)
  }

  @Get('questions/:questionId/answers')
  async getAvailableAnswersForQuestion(
    @Param('questionId', ParseIntPipe) questionId: number,
  ) {
    return this.onboardingService.getAvailableAnswersForQuestion(questionId)
  }

  @Post('answer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LEARNER)
  async chooseAnswerAsUser(
    @Body() body: CreateUserAnswerOnboardingDto,
    @Req() req: { user: User },
  ) {
    return this.onboardingService.chooseAnswerAsUser(req.user.id, body)
  }

  @Get('user/:userId/answers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LEARNER)
  async getUserAnswers(
    @Req() req: { user: User },
    @Query() query: PaginationDto,
  ) {
    return this.onboardingService.getUserAnswers(req.user.id, query)
  }
}
