import {
  Injectable,
  ConflictException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@/common/models/entities/user.entity'
import { Learner } from '@/common/models/entities/learner.entity'
import { Instructor } from '@/common/models/entities/instructor.entity'
import { Role } from '@/common/models/entities/role.entity'
import {
  throwAuthorizationValidationError,
  throwFormValidationError,
} from '@/common/utils/errors.utils'
import { ILike, Repository } from 'typeorm'
import { SignInDto } from '../dto/sign-in.dto'
import { LearnerSignUpDto } from '../dto/learner-signup.dto'
import { InstructorSignUpDto } from '../dto/instructor-sign-up.dto'
import { GoogleSignupDto } from '../dto/google-auth.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UserRole } from '@/common/enum/user-role.enum'
import { NameEmbedded } from '@/common/models/embedded/name.entity'
import { InstructorSkillLinker } from '../../common/models/entities/instructor-skill-linker.entity'
import { getCreateSuccessMessage } from '@/common/utils/success-messages.utils'
import { createUserLogData } from '@/modules/user-log/helper/user-log.helper'
import { UserLogService } from '@/modules/user-log/api/user-log.service'
import { LogStatus } from '@/common/enum/logs-status.enum'
import { GoogleStrategy } from '../strategies/google.strategy'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { EntrySkillLevel } from '@/common/enum/entry-skill-level.enum'
import { TargetSkillLevel } from '@/common/enum/target-skill-level.enum'
import { GooglePayloadInterface } from '../interfaces/google-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Learner)
    private readonly learnerRepository: Repository<Learner>,
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(InstructorSkillLinker)
    private readonly instructorSkillLinkerRepository: Repository<InstructorSkillLinker>,
    private readonly userLogService: UserLogService,
    private readonly jwtService: JwtService,
    private readonly googleStrategy: GoogleStrategy,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validateUser(credentials: SignInDto, ip?: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: ILike(credentials.email),
      },
      relations: {
        role: true,
      },
    })

    if (!user) {
      if (ip) {
        this.userLogService.saveUserLog(
          createUserLogData(
            0,
            `Failed login attempt - Account does not exist for email: ${credentials.email}`,
            LogStatus.FAILED,
            ip,
          ),
        )
      }
      throwAuthorizationValidationError({
        message: {
          en: 'Account does not exist',
          ar: 'الحساب غير موجود',
        },
      })
    }

    if (!user.password) {
      if (ip) {
        this.userLogService.saveUserLog(
          createUserLogData(
            user.id,
            `Failed login attempt - User signed up with Google OAuth for email: ${credentials.email}`,
            LogStatus.FAILED,
            ip,
          ),
        )
      }
      throwAuthorizationValidationError({
        message: {
          en: 'This account was created with Google. Please use Google Sign-In to login.',
          ar: 'تم إنشاء هذا الحساب باستخدام Google. يرجى استخدام تسجيل الدخول عبر Google.',
        },
      })
    }

    const isCorrectPassword = await bcrypt.compare(
      credentials.password,
      user.password,
    )
    if (!isCorrectPassword) {
      if (ip) {
        this.userLogService.saveUserLog(
          createUserLogData(
            user.id,
            `Failed login attempt - Invalid password for user: ${user.email}`,
            LogStatus.FAILED,
            ip,
          ),
        )
      }
      throwAuthorizationValidationError({
        message: {
          en: 'Invalid password',
          ar: 'كلمة المرور غير صحيحة',
        },
      })
    }
    if (user && isCorrectPassword) {
      return user
    }
    return null
  }

  public async login(user: User, ip: string) {
    try {
      const role = user.role.title.en
      const payload = { id: user.id, role: role }
      const userPayload = {
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        learnerId: user.learnerId,
        instructorId: user.instructorId,
      }

      const action = `User ${user.email} logged in from ${ip}`

      this.userLogService.saveUserLog(
        createUserLogData(user.id, action, LogStatus.SUCCESS, ip),
      )

      return {
        token: this.jwtService.sign(payload),
        user: {
          role,
          ...userPayload,
        },
      }
    } catch (error) {
      console.error('Error logging in:', error)
      const action = `User ${user.email} failed to login from ${ip}`
      this.userLogService.saveUserLog(
        createUserLogData(user.id, action, LogStatus.FAILED, ip),
      )
      throw error
    }
  }

  public async signupLearner(learnerSignUpDto: LearnerSignUpDto) {
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: ILike(learnerSignUpDto.email) },
        { phone: learnerSignUpDto.phone },
      ],
    })

    if (existingUser) {
      throw new ConflictException({
        message: {
          en: 'User with this email or phone already exists',
          ar: 'المستخدم بهذا البريد الإلكتروني أو الهاتف موجود بالفعل',
        },
      })
    }

    let learnerRole = await this.roleRepository.findOne({
      where: {
        title: {
          en: UserRole.LEARNER,
          ar: 'متعلم',
        } as NameEmbedded,
      },
    })

    if (!learnerRole) {
      learnerRole = this.roleRepository.create({
        title: {
          en: UserRole.LEARNER,
          ar: 'متعلم',
        } as NameEmbedded,
      })
      learnerRole = await this.roleRepository.save(learnerRole)
    }

    const hashedPassword = await bcrypt.hash(learnerSignUpDto.password, 10)

    const learner = this.learnerRepository.create({
      currentLevels: learnerSignUpDto.currentLevels,
      targetLevels: learnerSignUpDto.targetLevels,
      roi: 0,
      score: 0,
      isPresent: false,
    })
    const savedLearner = await this.learnerRepository.save(learner)

    const user = this.userRepository.create({
      email: learnerSignUpDto.email,
      password: hashedPassword,
      fullName: learnerSignUpDto.fullname,
      phone: learnerSignUpDto.phone,
      roleId: learnerRole.id,
      learnerId: savedLearner.id,
      file: learnerSignUpDto.file,
      isActive: true,
    })
    const savedUser = await this.userRepository.save(user)

    return {
      status: HttpStatus.CREATED,
      message: {
        en: 'Learner account created successfully',
        ar: 'تم إنشاء حساب المتعلم بنجاح',
      },
    }
  }

  public async signupInstructor(instructorSignUpDto: InstructorSignUpDto) {
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: ILike(instructorSignUpDto.email) },
    })

    if (existingUserByEmail) {
      throw new ConflictException({
        message: {
          en: `User with email ${instructorSignUpDto.email} already exists`,
          ar: `المستخدم بهذا البريد الإلكتروني ${instructorSignUpDto.email} موجود بالفعل`,
        },
      })
    }

    const existingUserByPhone = await this.userRepository.findOne({
      where: { phone: instructorSignUpDto.phone },
    })

    if (existingUserByPhone) {
      throw new ConflictException({
        message: {
          en: `User with phone ${instructorSignUpDto.phone} already exists`,
          ar: `المستخدم بهذا الهاتف ${instructorSignUpDto.phone} موجود بالفعل`,
        },
      })
    }

    const instructorRole = await this.roleRepository
      .createQueryBuilder('role')
      .where("role.title->>'en' = :name", { name: UserRole.INSTRUCTOR })
      .getOne()

    const hashedPassword = await bcrypt.hash(instructorSignUpDto.password, 10)

    const instructor = this.instructorRepository.create({
      rating: 0,
      isVerified: false,
    })
    const savedInstructor = await this.instructorRepository.save(instructor)

    const skillLink = this.instructorSkillLinkerRepository.create({
      instructorId: savedInstructor.id,
      skillId: instructorSignUpDto.skillId,
      yearsOfExperience: instructorSignUpDto.yearsOfExperience,
      proficiencyLevel: instructorSignUpDto.proficiencyLevel,
    })

    await this.instructorSkillLinkerRepository.save(skillLink)

    const user = this.userRepository.create({
      email: instructorSignUpDto.email,
      password: hashedPassword,
      fullName: instructorSignUpDto.fullname,
      phone: instructorSignUpDto.phone,
      roleId: instructorRole.id,
      instructorId: savedInstructor.id,
      file: instructorSignUpDto.file,
      isActive: true,
    })
    const savedUser = await this.userRepository.save(user)

    return getCreateSuccessMessage({
      entityName: 'user',
      entityId: savedUser.id,
    })
  }

  async signUpAccountWithGoogle(
    googleUser: GooglePayloadInterface,
    ip: string,
  ) {
    const accountExists = await this.findUserByGoogleId(
      googleUser.user.googleId,
    )
    if (accountExists) {
      return this.googleLoginWithToken(googleUser.token, ip)
    }

    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: ILike(googleUser.user.email) },
    })

    if (existingUserByEmail) {
      existingUserByEmail.googleId = googleUser.user.googleId
      existingUserByEmail.googleEmailVerified = true
      await this.userRepository.save(existingUserByEmail)

      const userWithRole = await this.userRepository.findOne({
        where: { id: existingUserByEmail.id },
        relations: { role: true },
      })

      const role = userWithRole?.role?.title?.en || null
      const payload = { id: existingUserByEmail.id, role: role }
      const userPayload = {
        userId: existingUserByEmail.id,
        fullName: existingUserByEmail.fullName,
        email: existingUserByEmail.email,
        learnerId: existingUserByEmail.learnerId,
        instructorId: existingUserByEmail.instructorId,
      }

      return {
        token: this.jwtService.sign(payload),
        user: {
          role,
          ...userPayload,
        },
      }
    }

    const viewerRole = await this.roleRepository.findOne({
      where: {
        title: {
          en: UserRole.VIEWER,
          ar: 'مشاهد',
        } as NameEmbedded,
      },
    })

    const user = this.userRepository.create({
      email: googleUser.user.email,
      password: null,
      fullName: googleUser.user.fullName,
      roleId: viewerRole.id,
      learnerId: null,
      instructorId: null,
      isActive: true,
      googleId: googleUser.user.googleId,
      googleEmailVerified: true,
    })
    const savedUser = await this.userRepository.save(user)

    const action = `User ${savedUser.email} registered via Google from ${ip}`
    this.userLogService.saveUserLog(
      createUserLogData(savedUser.id, action, LogStatus.SUCCESS, ip),
    )

    const userPayload = {
      userId: savedUser.id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      learnerId: savedUser.learnerId,
      instructorId: savedUser.instructorId,
    }

    return {
      token: this.jwtService.sign({
        id: savedUser.id,
        role: viewerRole.title.en,
      }),
      user: {
        role: viewerRole.title.en,
        ...userPayload,
      },
    }
  }

  async findUserByGoogleId(googleId: string) {
    return this.userRepository.findOne({
      where: { googleId },
    })
  }

  async googleLoginWithToken(googleToken: string, ip: string) {
    try {
      const googleUser = await this.googleStrategy.verifyToken(googleToken)

      let user = await this.userRepository.findOne({
        where: { googleId: googleUser.googleId },
        relations: { role: true },
      })

      if (!user) {
        user = await this.userRepository.findOne({
          where: { email: ILike(googleUser.email) },
          relations: { role: true },
        })

        if (user && !user.googleId) {
          user.googleId = googleUser.googleId
          user.googleEmailVerified = googleUser.emailVerified
          user.googleAccessToken = googleToken
          await this.userRepository.save(user)
        }
      }

      if (!user) {
        throwAuthorizationValidationError({
          message: {
            en: 'Account not found. Please sign up first.',
            ar: 'الحساب غير موجود. يرجى التسجيل أولاً.',
          },
        })
      }

      user.googleAccessToken = googleToken
      user.googleEmailVerified = googleUser.emailVerified
      user.googleTokensRevoked = false
      await this.userRepository.save(user)

      const role = user.role?.title?.en || null
      const payload = { id: user.id, role: role }
      const userPayload = {
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        learnerId: user.learnerId,
        instructorId: user.instructorId,
      }

      const action = `User ${user.email} logged in via Google OAuth from ${ip}`
      this.userLogService.saveUserLog(
        createUserLogData(user.id, action, LogStatus.SUCCESS, ip),
      )

      return {
        token: this.jwtService.sign(payload),
        user: {
          role,
          ...userPayload,
        },
      }
    } catch (error) {
      console.error('Google OAuth login error:', error)
      throw error
    }
  }

  private async createLearnerAndAssignRole(user: User, ip: string) {
    if (user.learnerId) {
      throw new ConflictException({
        message: {
          en: 'User is already a learner',
          ar: 'المستخدم متعلم بالفعل',
        },
      })
    }

    const learnerRole = await this.roleRepository.findOne({
      where: {
        title: {
          en: UserRole.LEARNER,
          ar: 'متعلم',
        } as NameEmbedded,
      },
    })

    if (!learnerRole) {
      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        message: {
          en: 'Learner role not found',
          ar: 'دور المتعلم غير موجود',
        },
      })
    }

    const learner = this.learnerRepository.create({
      currentLevels: EntrySkillLevel.BEGINNER,
      targetLevels: TargetSkillLevel.INTERMEDIATE,
      roi: 0,
      score: 0,
      isPresent: false,
    })
    const savedLearner = await this.learnerRepository.save(learner)

    user.roleId = learnerRole.id
    user.learnerId = savedLearner.id
    await this.userRepository.save(user)

    return { learnerRole, savedLearner }
  }

  private async createInstructorAndAssignRole(user: User, ip: string) {
    if (user.instructorId) {
      throw new ConflictException({
        message: {
          en: 'User is already an instructor',
          ar: 'المستخدم مدرب بالفعل',
        },
      })
    }

    const instructorRole = await this.roleRepository.findOne({
      where: {
        title: {
          en: UserRole.INSTRUCTOR,
          ar: 'مدرب',
        } as NameEmbedded,
      },
    })

    if (!instructorRole) {
      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        message: {
          en: 'Instructor role not found',
          ar: 'دور المدرب غير موجود',
        },
      })
    }

    const instructor = this.instructorRepository.create({
      rating: 0,
      isVerified: false,
    })
    const savedInstructor = await this.instructorRepository.save(instructor)

    user.roleId = instructorRole.id
    user.instructorId = savedInstructor.id
    await this.userRepository.save(user)

    return { instructorRole, savedInstructor }
  }

  async completeGoogleSignupLearner(userId: number, ip: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { role: true },
    })

    if (!user) {
      throwAuthorizationValidationError({
        message: {
          en: 'User not found',
          ar: 'المستخدم غير موجود',
        },
      })
    }

    if (user.roleId) {
      throw new ConflictException({
        message: {
          en: 'User already has a role assigned',
          ar: 'المستخدم لديه دور مخصص بالفعل',
        },
      })
    }

    await this.createLearnerAndAssignRole(user, ip)

    const userWithRole = await this.userRepository.findOne({
      where: { id: user.id },
      relations: { role: true },
    })

    const action = `User ${user.email} completed Google signup as Learner from ${ip}`
    this.userLogService.saveUserLog(
      createUserLogData(user.id, action, LogStatus.SUCCESS, ip),
    )

    const role = userWithRole?.role?.title?.en || UserRole.LEARNER
    const payload = { id: user.id, role: role }
    const userPayload = {
      userId: user.id,
      fullName: user.fullName,
      email: user.email,
      learnerId: user.learnerId,
      instructorId: user.instructorId,
    }

    return {
      token: this.jwtService.sign(payload),
      user: {
        role,
        ...userPayload,
      },
      message: {
        en: 'Learner account completed successfully',
        ar: 'تم إكمال حساب المتعلم بنجاح',
      },
    }
  }

  async completeGoogleSignupInstructor(userId: number, ip: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { role: true },
    })

    if (!user) {
      throwAuthorizationValidationError({
        message: {
          en: 'User not found',
          ar: 'المستخدم غير موجود',
        },
      })
    }

    if (user.roleId) {
      throw new ConflictException({
        message: {
          en: 'User already has a role assigned',
          ar: 'المستخدم لديه دور مخصص بالفعل',
        },
      })
    }

    await this.createInstructorAndAssignRole(user, ip)

    const userWithRole = await this.userRepository.findOne({
      where: { id: user.id },
      relations: { role: true },
    })

    const action = `User ${user.email} completed Google signup as Instructor from ${ip}`
    this.userLogService.saveUserLog(
      createUserLogData(user.id, action, LogStatus.SUCCESS, ip),
    )

    const role = userWithRole?.role?.title?.en || UserRole.INSTRUCTOR
    const payload = { id: user.id, role: role }
    const userPayload = {
      userId: user.id,
      fullName: user.fullName,
      email: user.email,
      learnerId: user.learnerId,
      instructorId: user.instructorId,
    }

    return {
      token: this.jwtService.sign(payload),
      user: {
        role,
        ...userPayload,
      },
      message: {
        en: 'Instructor account completed successfully',
        ar: 'تم إكمال حساب المدرب بنجاح',
      },
    }
  }
}
