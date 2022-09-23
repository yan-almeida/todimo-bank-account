import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { BankAccount } from './modules/bank-account/entities/bank-account.entity';
import { FilesModule } from './modules/files/files.module';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { UploadFilesModule } from './modules/upload-files/upload-files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [BankAccount, User],
    }),
    BankAccountModule,
    UserModule,
    AuthModule,
    FilesModule,
    UploadFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
