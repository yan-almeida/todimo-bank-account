import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptAdapter } from 'src/adapter/encryptation/bcrypt/bcrypt.adapter';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => BankAccountModule),
  ],
  controllers: [UserController],
  providers: [UserService, BcryptAdapter],
  exports: [UserService],
})
export class UserModule {}
