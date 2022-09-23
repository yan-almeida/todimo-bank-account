import { Readable } from 'stream';

export interface PayloadStorage {
  file: Express.Multer.File;
  /**
   * sempre que formos passar um nome customizado, deveremos informar a extensão do arquivo!
   */
  name?: string;
}

export abstract class StorageAdapter {
  abstract save(payload: PayloadStorage): Promise<void>;
  abstract get(payload: Pick<PayloadStorage, 'name'>): Promise<Readable>;
  abstract delete(path: string): Promise<void>;
}
