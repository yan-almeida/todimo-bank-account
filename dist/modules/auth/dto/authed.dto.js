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
exports.AuthedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../user/entities/user.entity");
const uuid_1 = require("uuid");
class AuthedDto {
    static toDto(token, user) {
        return {
            token,
            userId: user.id,
        };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'uuid',
        description: 'Código identificador do usuário.',
        example: (0, uuid_1.v4)(),
    }),
    __metadata("design:type", String)
], AuthedDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token de acesso do usuário.',
    }),
    __metadata("design:type", String)
], AuthedDto.prototype, "token", void 0);
exports.AuthedDto = AuthedDto;
//# sourceMappingURL=authed.dto.js.map