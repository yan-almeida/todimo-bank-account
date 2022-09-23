import { UnsupportedMediaTypeException } from '@nestjs/common';
import { Request } from 'express';

type Callback = (error: Error | null, acceptFile: boolean) => void;

export const MimetypeFilter = (...mimetypes: string[]) => {
  return (_: Request, file: Express.Multer.File, callback: Callback) => {
    const hasSomeMimetype: boolean = mimetypes.some((mimetype) =>
      file.mimetype.includes(mimetype),
    );

    if (hasSomeMimetype) {
      return callback(null, true);
    }

    callback(
      new UnsupportedMediaTypeException(
        `Tipos do arquivo aceitos no sistema: ${mimetypes.join(', ')}.`,
      ),
      false,
    );
  };
};
