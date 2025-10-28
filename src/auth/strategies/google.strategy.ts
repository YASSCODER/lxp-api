import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Credentials, OAuth2Client } from 'google-auth-library'

export interface GoogleUserInfo {
  googleId: string
  email: string
  emailVerified: boolean
  fullName: string
  picture?: string
  firstName?: string
  lastName?: string
}

@Injectable()
export class GoogleStrategy {
  private client: OAuth2Client

  constructor(private configService: ConfigService) {
    this.client = new OAuth2Client(
      configService.get<string>('GOOGLE_CLIENT_ID'),
      configService.get<string>('GOOGLE_CLIENT_SECRET'),
      configService.get<string>('GOOGLE_REDIRECT_URL'),
    )
  }

  async verifyIdToken(idToken: string): Promise<GoogleUserInfo> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      })

      const payload = ticket.getPayload()

      if (!payload) {
        throw new UnauthorizedException('Invalid Google token')
      }

      return {
        googleId: payload.sub,
        email: payload.email || '',
        emailVerified: payload.email_verified || false,
        fullName: payload.name || '',
        picture: payload.picture,
        firstName: payload.given_name,
        lastName: payload.family_name,
      }
    } catch (error) {
      console.error('Google token validation error:', error)
      throw new UnauthorizedException({
        message: {
          en: 'Invalid Google token',
          ar: 'رمز Google غير صالح',
        },
      })
    }
  }

  async verifyAccessToken(accessToken: string): Promise<GoogleUserInfo> {
    try {
      const response = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (!response.ok) {
        throw new UnauthorizedException({
          message: {
            en: 'Failed to verify Google access token',
            ar: 'فشل التحقق من رمز وصول Google',
          },
        })
      }

      const userInfo = await response.json()

      return {
        googleId: userInfo.id,
        email: userInfo.email || '',
        emailVerified: userInfo.verified_email || false,
        fullName: userInfo.name || '',
        picture: userInfo.picture,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
      }
    } catch (error) {
      console.error('Google access token validation error:', error)
      throw new UnauthorizedException({
        message: {
          en: 'Invalid Google access token',
          ar: 'رمز وصول Google غير صالح',
        },
      })
    }
  }

  /**
   * Verify both ID tokens and access tokens
   * Automatically detects which type of token it is and verifies accordingly
   */
  async verifyToken(token: string): Promise<GoogleUserInfo> {
    try {
      return await this.verifyIdToken(token)
    } catch (idTokenError) {
      try {
        return await this.verifyAccessToken(token)
      } catch (accessTokenError) {
        throw new UnauthorizedException({
          message: {
            en: 'Invalid Google token. Please ensure you are using a valid Google ID token or access token.',
            ar: 'رمز Google غير صالح. يرجى التأكد من استخدام رمز Google ID أو رمز الوصول صالح.',
          },
        })
      }
    }
  }

  async getTokens(code: string): Promise<{ tokens: Credentials }> {
    try {
      const { tokens } = await this.client.getToken(code)
      return { tokens }
    } catch (error) {
      console.error('Google tokens error:', error)
      throw new UnauthorizedException({
        message: {
          en: 'Failed to get Google tokens',
          ar: 'فشل الحصول على رمز Google',
        },
      })
    }
  }

  generateAuthUrl(): string {
    return this.client.generateAuthUrl({
      access_type: 'offline',
      scope: ['openid', 'email', 'profile'],
      prompt: 'consent',
    })
  }
}
