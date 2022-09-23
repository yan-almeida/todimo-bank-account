import { Module } from '@nestjs/common';
import { LocalStorageAdapter } from 'src/adapter/storage/local/local-storage.adapter';
import { StorageAdapter } from 'src/adapter/storage/storage.adapter';
import { UploadFilesController } from './upload-files.controller';
import { UploadFilesService } from './upload-files.service';

@Module({
  imports: [
    // MulterModule.register({
    //   dest: './upload',
    // }),
  ],
  controllers: [UploadFilesController],
  providers: [
    UploadFilesService,
    {
      provide: StorageAdapter,
      useClass: LocalStorageAdapter,
    },
  ],
})
export class UploadFilesModule {}
