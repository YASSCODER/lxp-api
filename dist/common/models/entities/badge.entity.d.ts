import { BaseModel } from '../types/base-model.entity';
import { FileEmbedded } from '../embedded/file.entity';
import { BadgeLearnerLink } from './badge-learner-link.entity';
export declare class Badge extends BaseModel {
    id: number;
    title: string;
    description: string;
    image: FileEmbedded;
    learnerLinks: BadgeLearnerLink[];
}
