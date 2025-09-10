"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeLearnerLink = void 0;
const typeorm_1 = require("typeorm");
const base_model_entity_1 = require("../types/base-model.entity");
const badge_entity_1 = require("./badge.entity");
const learner_entity_1 = require("./learner.entity");
let BadgeLearnerLink = class BadgeLearnerLink extends base_model_entity_1.BaseModel {
};
exports.BadgeLearnerLink = BadgeLearnerLink;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BadgeLearnerLink.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], BadgeLearnerLink.prototype, "badgeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], BadgeLearnerLink.prototype, "learnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], BadgeLearnerLink.prototype, "isAssigned", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => badge_entity_1.Badge, (badge) => badge.learnerLinks),
    (0, typeorm_1.JoinColumn)({ name: 'badgeId' }),
    __metadata("design:type", badge_entity_1.Badge)
], BadgeLearnerLink.prototype, "badge", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => learner_entity_1.Learner, (learner) => learner.badgeLinks),
    (0, typeorm_1.JoinColumn)({ name: 'learnerId' }),
    __metadata("design:type", learner_entity_1.Learner)
], BadgeLearnerLink.prototype, "learner", void 0);
exports.BadgeLearnerLink = BadgeLearnerLink = __decorate([
    (0, typeorm_1.Entity)('badge_learner_link')
], BadgeLearnerLink);
//# sourceMappingURL=badge-learner-link.entity.js.map