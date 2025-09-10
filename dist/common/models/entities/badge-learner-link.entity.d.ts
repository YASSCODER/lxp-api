import { BaseModel } from '../types/base-model.entity';
import { Badge } from './badge.entity';
import { Learner } from './learner.entity';
export declare class BadgeLearnerLink extends BaseModel {
    id: string;
    badgeId: number;
    learnerId: number;
    isAssigned: boolean;
    badge: Badge;
    learner: Learner;
}
