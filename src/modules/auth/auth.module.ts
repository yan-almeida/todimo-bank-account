import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BcryptAdapter } from 'src/adapter/encryptation/bcrypt/bcrypt.adapter';
import { EncrypterAdapter } from 'src/adapter/encryptation/interfaces/encrypter.interface';
import { JwtAuthStrategy } from 'src/common/strategies/jwt-auth.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'master-ultra-mega-secret-todimo-8410-8569',
      signOptions: {
        expiresIn: '10 days',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtAuthStrategy,
    {
      provide: EncrypterAdapter,
      useClass: BcryptAdapter,
    },
  ],
})
export class AuthModule {}
