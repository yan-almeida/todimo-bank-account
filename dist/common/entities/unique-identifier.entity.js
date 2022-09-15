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
exports.UniqueIdentifierEntity = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const date_entity_1 = require("./date.entity");
class UniqueIdentifierEntity extends date_entity_1.DateEntity {
    generateUuid() {
        if (this.id) {
            return;
        }
        this.id = (0, uuid_1.v4)();
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UniqueIdentifierEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UniqueIdentifierEntity.prototype, "generateUuid", null);
exports.UniqueIdentifierEntity = UniqueIdentifierEntity;
//# sourceMappingURL=unique-identifier.entity.js.map