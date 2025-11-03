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
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { LearnerSignUpDto } from '../dto/learner-signup.dto'
import { InstructorSignUpDto } from '../dto/instructor-sign-up.dto'
import { GoogleSignupDto } from '../dto/google-auth.dto'
import { AuthExceptionFilter } from '../filters/auth-exception.filter'
import { GoogleStrategy } from '../strategies/google.strategy'
import { Response } from 'express'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'
import { UserRole } from '@/common/enum/user-role.enum'

@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleStrategy: GoogleStrategy,
    private readonly configService: ConfigService,
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

  @Get('google/authorize')
  getGoogleAuthUrl() {
    const authUrl = this.googleStrategy.generateAuthUrl()
    return { authUrl }
  }

  @Get('oauth2callback')
  async oauth2callback(
    @Query('code') code: string,
    @Ip() ip: string,
    @Res() res: Response,
  ) {
    if (!code) {
      return res.status(400).send('No code provided')
    }

    try {
      const { tokens } = await this.googleStrategy.getTokens(code)
      const googleUser = await this.googleStrategy.verifyToken(tokens.id_token)

      const googlePayload = {
        token: tokens.id_token,
        user: googleUser,
      }

      const result = await this.authService.signUpAccountWithGoogle(
        googlePayload,
        ip,
      )

      // Get frontend redirect URL from environment or use default
      const frontendRedirectUrl =
        this.configService.get<string>('FRONTEND_REDIRECT_URL') ||
        this.configService.get<string>('app.url') ||
        'http://localhost:3000'

      // Build redirect URL with token and user info
      const redirectUrl = new URL(frontendRedirectUrl)
      redirectUrl.searchParams.set('token', result.token)
      redirectUrl.searchParams.set('userId', result.user.userId.toString())
      redirectUrl.searchParams.set('role', result.user.role || 'null')

      // Add user info as query params
      if (result.user.email) {
        redirectUrl.searchParams.set('email', result.user.email)
      }

      // Redirect to frontend
      return res.redirect(redirectUrl.toString())
    } catch (error) {
      console.error('Google OAuth callback error:', error)

      // Redirect to frontend with error
      const frontendRedirectUrl =
        this.configService.get<string>('FRONTEND_REDIRECT_URL') ||
        this.configService.get<string>('app.url') ||
        'http://localhost:3000'

      const redirectUrl = new URL(frontendRedirectUrl)
      redirectUrl.searchParams.set('error', error.message || 'OAuth failed')

      return res.redirect(redirectUrl.toString())
    }
  }

  @Post('google/complete/signup-learner')
  @UseGuards(JwtAuthGuard)
  async completeSignupLearner(@Request() request, @Ip() ip: string) {
    const user = request.user
    if (!user) {
      throw new UnauthorizedException('User not authenticated')
    }
    return this.authService.completeGoogleSignupLearner(user.id, ip)
  }

  @Post('google/complete/signup-instructor')
  @UseGuards(JwtAuthGuard)
  async completeSignupInstructor(@Request() request, @Ip() ip: string) {
    const user = request.user
    if (!user) {
      throw new UnauthorizedException('User not authenticated')
    }
    return this.authService.completeGoogleSignupInstructor(user.id, ip)
  }

  @Post('google/login/')
  async googleLoginWithToken(
    @Body() googleSignupDto: GoogleSignupDto,
    @Ip() ip: string,
  ) {
    return this.authService.googleLoginWithToken(
      googleSignupDto.googleToken,
      ip,
    )
  }
}
