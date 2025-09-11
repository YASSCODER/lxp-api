import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { authSelector } from '../selector/find-one.selector';
import { User } from '@/common/models/entities/user.entity';
import { JwtPayload, ValidatedUser } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  public async validate(payload: JwtPayload): Promise<ValidatedUser | null> {
    const user = await this.repository.findOne({
      where: { id: payload.id },
      relations: { role: true, learner: true, instructor: true },
      select: authSelector,
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
    };
  }
}
