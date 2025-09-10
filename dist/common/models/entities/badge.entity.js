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
exports.Badge = void 0;
const typeorm_1 = require("typeorm");
const base_model_entity_1 = require("../types/base-model.entity");
const file_entity_1 = require("../embedded/file.entity");
const badge_learner_link_entity_1 = require("./badge-learner-link.entity");
let Badge = class Badge extends base_model_entity_1.BaseModel {
};
exports.Badge = Badge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Badge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Badge.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Badge.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", file_entity_1.FileEmbedded)
], Badge.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => badge_learner_link_entity_1.BadgeLearnerLink, (link) => link.badge),
    __metadata("design:type", Array)
], Badge.prototype, "learnerLinks", void 0);
exports.Badge = Badge = __decorate([
    (0, typeorm_1.Entity)('badge')
], Badge);
//# sourceMappingURL=badge.entity.js.map