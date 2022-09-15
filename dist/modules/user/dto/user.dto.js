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
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const uuid_1 = require("uuid");
class UserDto {
    static from(user) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
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
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        maxLength: 255,
        example: 'Fulano da Silva',
        description: 'Nome do usuário.',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        maxLength: 200,
        example: 'user@email.com',
        description: 'Email do usuário.',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map