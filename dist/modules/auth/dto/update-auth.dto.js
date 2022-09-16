"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const auth_dto_1 = require("./auth.dto");
class UpdateAuthDto extends (0, swagger_1.PartialType)(auth_dto_1.AuthDto) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map