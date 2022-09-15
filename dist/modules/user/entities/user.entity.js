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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const unique_identifier_entity_1 = require("../../../common/entities/unique-identifier.entity");
const bank_account_entity_1 = require("../../bank-account/entities/bank-account.entity");
const typeorm_1 = require("typeorm");
let User = User_1 = class User extends unique_identifier_entity_1.UniqueIdentifierEntity {
};
__decorate([
    (0, typeorm_1.Column)({ length: '255' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: '200' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bank_account_entity_1.BankAccount, () => User_1),
    __metadata("design:type", Array)
], User.prototype, "bankAccounts", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)('tb_user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map