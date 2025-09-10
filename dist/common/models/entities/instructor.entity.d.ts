import { BaseModel } from '../types/base-model.entity';
import { User } from './user.entity';
export declare class Instructor extends BaseModel {
    id: number;
    rating: number;
    isVerified: boolean;
    users: User[];
}
