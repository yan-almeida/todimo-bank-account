"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../user/user.module");
const bank_account_controller_1 = require("./bank-account.controller");
const bank_account_service_1 = require("./bank-account.service");
const bank_account_entity_1 = require("./entities/bank-account.entity");
let BankAccountModule = class BankAccountModule {
};
BankAccountModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bank_account_entity_1.BankAccount]), user_module_1.UserModule],
        controllers: [bank_account_controller_1.BankAccountController],
        providers: [bank_account_service_1.BankAccountService],
    })
], BankAccountModule);
exports.BankAccountModule = BankAccountModule;
//# sourceMappingURL=bank-account.module.js.map