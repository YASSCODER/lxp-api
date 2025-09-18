import { Injectable, ConflictException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@/common/models/entities/user.entity'
import { Learner } from '@/common/models/entities/learner.entity'
import { Instructor } from '@/common/models/entities/instructor.entity'
import { Role } from '@/common/models/entities/role.entity'
import { throwAuthorizationValidationError } from '@/common/utils/errors.utils'
import { ILike, Repository } from 'typeorm'
import { SignInDto } from '../dto/sign-in.dto'
import { LearnerSignUpDto } from '../dto/learner-signup.dto'
import { InstructorSignUpDto } from '../dto/instructor-sign-up.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UserRole } from '@/common/enum/user-role.enum'
import { NameEmbedded } from '@/common/models/embedded/name.entity'
import { InstructorSkillLinker } from '../../common/models/entities/instructor-skill-linker.entity'
import { getCreateSuccessMessage } from '@/common/utils/success-messages.utils'

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
    private readonly jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validateUser(credentials: SignInDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: ILike(credentials.email),
      },
      relations: {
        role: true,
      },
    })

    if (!user)
      throwAuthorizationValidationError({
        message: {
          en: 'Account does not exist',
          ar: 'الحساب غير موجود',
        },
      })

    const isCorrectPassword = await bcrypt.compare(
      credentials.password,
      user.password,
    )
    if (!isCorrectPassword) {
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

  public async login(user: User) {
    const role = user.role.title.en
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
}
