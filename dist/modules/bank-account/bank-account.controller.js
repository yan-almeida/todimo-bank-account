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
exports.BankAccountController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bank_account_service_1 = require("./bank-account.service");
const bank_account_dto_1 = require("./dto/bank-account.dto");
const create_bank_account_dto_1 = require("./dto/create-bank-account.dto");
const update_bank_account_dto_1 = require("./dto/update-bank-account.dto");
let BankAccountController = class BankAccountController {
    constructor(bankAccountService) {
        this.bankAccountService = bankAccountService;
    }
    async create(createBankAccountDto) {
        const bankAccount = await this.bankAccountService.create(createBankAccountDto);
        return bank_account_dto_1.BankAccountDto.toDto(bankAccount);
    }
    async findAll() {
        const bankAccounts = await this.bankAccountService.findAll();
        return bankAccounts.map(bank_account_dto_1.BankAccountDto.toDto);
    }
    async findOne(id) {
        const bankAccount = await this.bankAccountService.findOne(id);
        return bank_account_dto_1.BankAccountDto.toDto(bankAccount);
    }
    update(id, updateBankAccountDto) {
        return this.bankAccountService.update(id, updateBankAccountDto);
    }
    remove(id) {
        return this.bankAccountService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Conta criada com sucesso.',
        type: bank_account_dto_1.BankAccountDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Erro de validação ao criar conta.' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bank_account_dto_1.CreateBankAccountDto]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Contas buscadas.',
        type: [bank_account_dto_1.BankAccountDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Conta buscada pelo ID.',
        type: bank_account_dto_1.BankAccountDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Conta não encontrada.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Erro de validação ao buscar conta.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bank_account_dto_1.UpdateBankAccountDto]),
    __metadata("design:returntype", void 0)
], BankAccountController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BankAccountController.prototype, "remove", null);
BankAccountController = __decorate([
    (0, swagger_1.ApiTags)('Bank Account'),
    (0, common_1.Controller)('bank-account'),
    __metadata("design:paramtypes", [bank_account_service_1.BankAccountService])
], BankAccountController);
exports.BankAccountController = BankAccountController;
//# sourceMappingURL=bank-account.controller.js.map