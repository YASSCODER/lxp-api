import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LearnerSignUpDto } from '../dto/learner-signup.dto';
import { InstructorSignUpDto } from '../dto/instructor-sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  public verify() {
    return true;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Post('signup/learner')
  async signupLearner(@Body() learnerSignUpDto: LearnerSignUpDto) {
    return this.authService.signupLearner(learnerSignUpDto);
  }

  @Post('signup/instructor')
  async signupInstructor(@Body() instructorSignUpDto: InstructorSignUpDto) {
    return this.authService.signupInstructor(instructorSignUpDto);
  }
}
