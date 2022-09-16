export interface EncrypterAdapter {
    encrypt(plainText: string): Promise<string>;
    compare(plainText: string, hash: string): Promise<boolean>;
}
