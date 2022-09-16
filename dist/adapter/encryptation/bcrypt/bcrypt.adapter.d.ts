import { EncrypterAdapter } from '../interfaces/encrypter.interface';
export declare class BcryptAdapter implements EncrypterAdapter {
    private rounds;
    encrypt(plainText: string): Promise<string>;
    compare(plainText: string, hash: string): Promise<boolean>;
    private generateSalts;
}
