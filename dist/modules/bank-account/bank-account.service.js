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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const bank_account_entity_1 = require("./entities/bank-account.entity");
let BankAccountService = class BankAccountService {
    constructor(bankAccountRepository, userService) {
        this.bankAccountRepository = bankAccountRepository;
        this.userService = userService;
    }
    async create(createBankAccountDto) {
        const user = await this.userService.findOne(createBankAccountDto.userId);
        const bankAccount = this.bankAccountRepository.create(Object.assign(Object.assign({}, createBankAccountDto), { user }));
        return this.bankAccountRepository.save(bankAccount);
    }
    findAll(filterBankAccountDto) {
        return this.bankAccountRepository.find({
            where: {
                user: {
                    id: filterBankAccountDto === null || filterBankAccountDto === void 0 ? void 0 : filterBankAccountDto.userId,
                },
            },
        });
    }
    async findOne(id) {
        const bankAccount = await this.bankAccountRepository.findOne({
            where: {
                id,
            },
        });
        if (!bankAccount) {
            throw new common_1.NotFoundException('Conta não encontrada.');
        }
        return bankAccount;
    }
    update(id, updateBankAccountDto) {
        return `This action updates a #${id} bankAccount`;
    }
    remove(id) {
        return `This action removes a #${id} bankAccount`;
    }
};
BankAccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bank_account_entity_1.BankAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], BankAccountService);
exports.BankAccountService = BankAccountService;
//# sourceMappingURL=bank-account.service.js.map