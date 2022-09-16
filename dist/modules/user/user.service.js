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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_adapter_1 = require("../../adapter/encryptation/bcrypt/bcrypt.adapter");
const typeorm_2 = require("typeorm");
const bank_account_service_1 = require("../bank-account/bank-account.service");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository, bankAccountService, bcryptAdapter) {
        this.userRepository = userRepository;
        this.bankAccountService = bankAccountService;
        this.bcryptAdapter = bcryptAdapter;
    }
    async create(createUserDto) {
        await this.validateUserExistsByEmail(createUserDto.email);
        const password = await this.bcryptAdapter.encrypt(createUserDto.password);
        const user = this.userRepository.create(Object.assign(Object.assign({}, createUserDto), { password }));
        return this.userRepository.save(user);
    }
    findAll() {
        return this.userRepository.find();
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado.');
        }
        return user;
    }
    findOneBy(where) {
        return this.userRepository.findOneBy(where);
    }
    async update(id, updateUserDto) {
        if (updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.email) {
            await this.validateEmailAndIdIsNotSameUser(id, updateUserDto.email);
        }
        const updateResult = await this.userRepository.update(id, updateUserDto);
        if (updateResult.affected === 0) {
            throw new common_1.NotFoundException('Usuário não encontrado.');
        }
        return this.userRepository.findOneBy({ id });
    }
    async remove(id) {
        await this.findOne(id);
        const softDeleteResult = await this.userRepository.softDelete(id);
        if (softDeleteResult.affected === 0) {
            throw new common_1.NotFoundException('Usuário não encontrado.');
        }
        await this.bankAccountService.removeByUserId(id);
    }
    async validateEmailAndIdIsNotSameUser(id, email) {
        const count = await this.userRepository.countBy({
            id: (0, typeorm_2.Not)(id),
            email,
        });
        if (count > 0) {
            throw new common_1.ConflictException('Usuário já cadastrado.');
        }
    }
    async validateUserExistsByEmail(email) {
        const countUsers = await this.userRepository.countBy({
            email,
        });
        if (countUsers > 0) {
            throw new common_1.ConflictException('Usuário já cadastrado.');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bank_account_service_1.BankAccountService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        bank_account_service_1.BankAccountService,
        bcrypt_adapter_1.BcryptAdapter])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map