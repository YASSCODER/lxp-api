import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
  Ip,
  UseFilters,
  Query,
  Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { LearnerSignUpDto } from '../dto/learner-signup.dto'
import { InstructorSignUpDto } from '../dto/instructor-sign-up.dto'
import { GoogleSignupDto } from '../dto/google-auth.dto'
import { AuthExceptionFilter } from '../filters/auth-exception.filter'
import { GoogleStrategy } from '../strategies/google.strategy'
import { Response } from 'express'

@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleStrategy: GoogleStrategy,
  ) {}

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  public verify() {
    return true
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request, @Ip() ip: string) {
    return this.authService.login(request.user, ip)
  }

  @Post('learner/signup')
  async signupLearner(@Body() learnerSignUpDto: LearnerSignUpDto) {
    return this.authService.signupLearner(learnerSignUpDto)
  }

  @Post('instructor/signup')
  async signupInstructor(@Body() instructorSignUpDto: InstructorSignUpDto) {
    return this.authService.signupInstructor(instructorSignUpDto)
  }

  @Post('google/signup/learner')
  async googleSignup(
    @Body() googleSignupDto: GoogleSignupDto,
    @Ip() ip: string,
  ) {
    return this.authService.googleSignupLearner(googleSignupDto, ip)
  }

  @Post('google/signup/instructor')
  async googleSignupInstructor(
    @Body() googleSignupDto: GoogleSignupDto,
    @Ip() ip: string,
  ) {
    return this.authService.googleSignupInstructor(googleSignupDto, ip)
  }

  @Get('google/authorize')
  getGoogleAuthUrl() {
    const authUrl = this.googleStrategy.generateAuthUrl()
    return { authUrl }
  }

  @Get('oauth2callback')
  async oauth2callback(@Query('code') code: string, @Res() res: Response) {
    if (!code) {
      return res.status(400).send('No code provided')
    }

    try {
      const { tokens } = await this.googleStrategy.getTokens(code)
      const googleUser = await this.googleStrategy.verifyToken(tokens.id_token)

      return res.json({
        token: tokens.id_token,
        user: {
          googleId: googleUser.googleId,
          email: googleUser.email,
          fullName: googleUser.fullName,
        },
      })
    } catch (error) {
      console.error('Google OAuth callback error:', error)
      return res.status(500).json({ error: error.message })
    }
  }
}
