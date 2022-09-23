import { Injectable, Logger } from '@nestjs/common';
import { unlinkSync, writeFileSync } from 'fs';
import { createFileName } from 'src/common/utils/create-file-name.util';
import { Readable } from 'stream';
import { PayloadStorage, StorageAdapter } from '../storage.adapter';

const BASE_PATH = 'upload';

@Injectable()
export class LocalStorageAdapter implements StorageAdapter {
  private readonly logger = new Logger(LocalStorageAdapter.name);

  async save({ name, file }: PayloadStorage): Promise<void> {
    try {
      writeFileSync(
        `${BASE_PATH}/${createFileName(name ?? file.originalname)}`,
        file.buffer,
      );
    } catch (error) {
      this.logger.error(error);
      this.logger.error(`Erro ao tentar salvar o arquivo: ${error.message}`);
    }
  }

  get(payload: Pick<PayloadStorage, 'name'>): Promise<Readable> {
    throw new Error('Method not implemented.');
  }

  async delete(path: string): Promise<void> {
    try {
      unlinkSync(`${BASE_PATH}/${path}`);
    } catch (error) {
      this.logger.error(error);
      this.logger.error(`Erro ao tentar remover o arquivo: ${error.message}`);
    }
  }
}
