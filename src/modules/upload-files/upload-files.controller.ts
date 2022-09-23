import { Controller, Delete, Param, Post, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/common/decorators/swagger/api-file.decorator';
import { MimetypeFilter } from 'src/common/filters/mimetype.filter';
import { UploadFilesService } from './upload-files.service';

@Controller('upload-files')
@ApiTags('Upload files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @Post('with-multer-dest')
  @ApiFile('avatar', true, {
    fileFilter: MimetypeFilter('text/csv'),
  })
  upload(@UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.uploadFilesService.create(file);
  }

  @Delete(':path')
  delete(@Param('path') path: string) {
    return this.uploadFilesService.delete(path);
  }
}
