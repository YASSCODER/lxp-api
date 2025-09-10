import { BaseModel } from '../types/base-model.entity';
import { BadgeLearnerLink } from './badge-learner-link.entity';
import { User } from './user.entity';
export declare class Learner extends BaseModel {
    id: number;
    roi: number;
    score: number;
    isPresent: boolean;
    users: User[];
    badgeLinks: BadgeLearnerLink[];
}
