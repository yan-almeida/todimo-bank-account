import { JwtService } from '@nestjs/jwt';
import { BcryptAdapter } from 'src/adapter/encryptation/bcrypt/bcrypt.adapter';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly userService;
    private readonly bcryptAdapter;
    private readonly jwtService;
    constructor(userService: UserService, bcryptAdapter: BcryptAdapter, jwtService: JwtService);
    login(authDto: AuthDto): Promise<string>;
    private validateUserPasword;
}
