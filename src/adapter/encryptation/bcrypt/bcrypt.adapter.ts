import { Injectable } from '@nestjs/common';
import { compareSync, genSalt, hash } from 'bcrypt';
import { EncrypterAdapter } from '../interfaces/encrypter.interface';

@Injectable()
export class BcryptAdapter implements EncrypterAdapter {
  private rounds = 10;

  async encrypt(plainText: string): Promise<string> {
    const salts = await this.generateSalts();

    return hash(plainText, salts);
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return compareSync(plainText, hash);
  }

  private generateSalts(): Promise<string> {
    return genSalt(this.rounds);
  }
}
