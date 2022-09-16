export interface EncrypterAdapter {
  /**
   * Realizar encriptação de texto plano, retornando um hash.
   *
   * @param plainText - texto plano de entrada
   */
  encrypt(plainText: string): Promise<string>;

  /** @deprecated */
  compare(plainText: string, hash: string): Promise<boolean>;
}
