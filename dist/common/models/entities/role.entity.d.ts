import { BaseModel } from '../types/base-model.entity';
import { Name } from '../embedded/name.entity';
import { User } from './user.entity';
export declare class Role extends BaseModel {
    id: string;
    title: Name;
    users: User[];
}
