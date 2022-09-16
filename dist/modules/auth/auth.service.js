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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_adapter_1 = require("../../adapter/encryptation/bcrypt/bcrypt.adapter");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, bcryptAdapter, jwtService) {
        this.userService = userService;
        this.bcryptAdapter = bcryptAdapter;
        this.jwtService = jwtService;
    }
    async login(authDto) {
        const user = await this.userService.findOneBy({
            email: authDto.email,
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        await this.validateUserPasword(authDto.password, user.password);
        return this.jwtService.signAsync({
            id: user.id,
            name: user.name,
        }, {
            privateKey: 'master-ultra-mega-secret-todimo-8410-8569',
        });
    }
    async validateUserPasword(plainText, hash) {
        const isValidPassword = await this.bcryptAdapter.compare(plainText, hash);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException();
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        bcrypt_adapter_1.BcryptAdapter,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map