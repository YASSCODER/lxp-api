import { User } from 'src/common/models/entities/user.entity';

export interface JwtPayload {
  id: number;
  role?: string;
  impersonatedBy?: string;
  impersonatorEmail?: string;
  isImpersonation?: boolean;
}

export interface ValidatedUser extends User {
  impersonatedBy?: string;
  impersonatorEmail?: string;
  isImpersonation?: boolean;
}
