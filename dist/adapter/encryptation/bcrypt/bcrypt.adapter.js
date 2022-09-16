"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptAdapter = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
let BcryptAdapter = class BcryptAdapter {
    constructor() {
        this.rounds = 10;
    }
    async encrypt(plainText) {
        const salts = await this.generateSalts();
        return (0, bcrypt_1.hash)(plainText, salts);
    }
    async compare(plainText, hash) {
        return (0, bcrypt_1.compareSync)(plainText, hash);
    }
    generateSalts() {
        return (0, bcrypt_1.genSalt)(this.rounds);
    }
};
BcryptAdapter = __decorate([
    (0, common_1.Injectable)()
], BcryptAdapter);
exports.BcryptAdapter = BcryptAdapter;
//# sourceMappingURL=bcrypt.adapter.js.map