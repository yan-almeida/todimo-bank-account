import { Injectable } from '@nestjs/common';
import { StorageAdapter } from 'src/adapter/storage/storage.adapter';

const BASE_PATH = './manual-upload';

@Injectable()
export class UploadFilesService {
  // sintax suggar
  constructor(private readonly storageAdapter: StorageAdapter) {}

  /**
   * documentos/jean/...
   * auditoria/16-02-2022/...
   * documentos/yan/...
   *
   */

  create(file: Express.Multer.File) {
    return this.storageAdapter.save({
      file,
      name: 'test.csv',
    });
  }

  delete(path: string) {
    return this.storageAdapter.delete(path);
  }
}
