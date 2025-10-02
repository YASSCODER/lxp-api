import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { User } from '@/common/models/entities/user.entity'
import { Learner } from '@/common/models/entities/learner.entity'
import { Instructor } from '@/common/models/entities/instructor.entity'
import { Role } from '@/common/models/entities/role.entity'
import { AuthController } from './api/auth.controller'
import { AuthService } from './api/auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { RolesGuard } from './guards/roles.guard'
import { InstructorSkillLinker } from '@/common/models/entities/instructor-skill-linker.entity'
import { UserLogService } from '@/modules/user-log/api/user-log.service'
import { AuthExceptionFilter } from './filters/auth-exception.filter'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Learner,
      Instructor,
      Role,
      InstructorSkillLinker,
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') || '24h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
    RolesGuard,
    UserLogService,
    AuthExceptionFilter,
  ],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
