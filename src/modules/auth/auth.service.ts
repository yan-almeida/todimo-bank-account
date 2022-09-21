import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncrypterAdapter } from 'src/adapter/encryptation/interfaces/encrypter.interface';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encrypterAdapter: EncrypterAdapter,
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
      },
      {
        privateKey: 'master-ultra-mega-secret-todimo-8410-8569',
      },
    );
  }

  profile(userId: string) {
    return this.userService.findOne(userId);
  }

  private async validateUserPasword(
    plainText: string,
    hash: string,
  ): Promise<void> {
    const isValidPassword = await this.encrypterAdapter.compare(
      plainText,
      hash,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
  }
}
