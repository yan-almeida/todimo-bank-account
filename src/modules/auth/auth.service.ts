import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptAdapter } from 'src/adapter/encryptation/bcrypt/bcrypt.adapter';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.userService.findOneBy({
      email: authDto.email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    // validar se a senha do usuário retornado é a mesma senha do usuário que está tentando se autenticar.
    await this.validateUserPasword(authDto.password, user.password);

    // gerar token de acesso do usuário autenticado
    return this.jwtService.signAsync(
      {
        id: user.id,
        name: user.name,
      },
      {
        privateKey: 'master-ultra-mega-secret-todimo-8410-8569',
      },
    );
  }

  private async validateUserPasword(
    plainText: string,
    hash: string,
  ): Promise<void> {
    // const hashedPlainText = await this.bcryptAdapter.encrypt(plainText);
    const isValidPassword = await this.bcryptAdapter.compare(plainText, hash);

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
  }
}
