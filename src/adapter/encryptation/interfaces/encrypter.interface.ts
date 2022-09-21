export abstract class EncrypterAdapter {
  /**
   * Realiza encriptação de texto plano, retornando um hash.
   *
   * @param plainText - texto plano de entrada
   */
  abstract encrypt(plainText: string): Promise<string>;

  /**
   * Realiza comparação entre dados de entrada - senha e senha armazenada.
   *
   * @param plainText - texto plano de entrada
   * @param hash - texto encriptado
   */
  abstract compare(plainText: string, hash: string): Promise<boolean>;
}
