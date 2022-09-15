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
exports.FilterBankAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
class FilterBankAccountDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'uuid',
        description: 'Código identificador da conta.',
        example: (0, uuid_1.v4)(),
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Identificador único do usuário é esperado.' }),
    __metadata("design:type", String)
], FilterBankAccountDto.prototype, "userId", void 0);
exports.FilterBankAccountDto = FilterBankAccountDto;
//# sourceMappingURL=filter-bank-account.dto.js.map