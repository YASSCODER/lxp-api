import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/common/models/entities/user.entity';
import { throwAuthorizationValidationError } from '@/common/utils/errors.utils';
import { ILike, Repository } from 'typeorm';
import { SignInDto } from '../dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    });

    if (!user)
      throwAuthorizationValidationError({
        message: {
          en: 'Account does not exist',
          ar: 'الحساب غير موجود',
        },
      });

    const isCorrectPassword = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!isCorrectPassword) {
      throwAuthorizationValidationError({
        message: {
          en: 'Invalid password',
          ar: 'كلمة المرور غير صحيحة',
        },
      });
    }
    if (user && isCorrectPassword) {
      return user;
    }
    return null;
  }

  public async login(user: User) {
    const title = user.role.title;
    const payload = { id: user.id, role: user.role };
    const userPayload = {
      id: user.id,
      role: user.role,
      fullname: user.fullName,
      email: user.email,
      learnerId: user.learnerId,
      instructorId: user.instructorId,
    };

    return {
      token: this.jwtService.sign(payload),
      title,
      ...userPayload,
    };
  }
}
