import { BaseModel } from '../types/base-model.entity';
import { Role } from './role.entity';
import { Learner } from './learner.entity';
import { Instructor } from './instructor.entity';
export declare class User extends BaseModel {
    id: number;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    isActive: boolean;
    roleId: string;
    learnerId: number;
    instructorId: number;
    role: Role;
    learner: Learner;
    instructor: Instructor;
}
