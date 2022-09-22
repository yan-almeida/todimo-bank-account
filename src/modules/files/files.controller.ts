import { Controller, Get, Header, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';
import { AsyncPipeline } from 'src/common/utils/async-pipeline.util';
import { Readable, Transform } from 'stream';
import { v4 as uuid } from 'uuid';
import { FilesService } from './files.service';
import { CsvData } from './interfaces/csv.interface';

@Controller('export-files')
@ApiTags('Files')
export class FilesController {
  private readonly staticFile: ReadStream = createReadStream(
    join(process.cwd(), 'september-2021-estimated-migration.csv'),
  );

  constructor(private readonly filesService: FilesService) {}

  @Get('response')
  @Header('Content-type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="migration-data.csv"')
  getFileWithResponse(@Res() response: Response): void {
    this.staticFile.pipe(response);
  }

  @Get('streamable')
  getFileWithStreamable(): StreamableFile {
    return new StreamableFile(this.staticFile, {
      disposition: 'attachment; filename="migration-data.csv"',
      type: 'text/csv',
    });
  }

  @Get('translated-with-pipe')
  @Header('Content-type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="migration-data.csv"')
  async getTranslatedFileWithPipe(@Res() response: Response) {
    let counter = 0;

    const readCsv = new Readable({
      async read() {
        let counter = 0;

        const file = createReadStream(
          join(process.cwd(), 'september-2021-estimated-migration.csv'),
        );
        const readBufferLine = createInterface(file);

        for await (const eachLine of readBufferLine) {
          if (counter) {
            const [
              yearMonth,
              monthOfRelease,
              passengerType,
              direction,
              sex,
              age,
              estimate,
              standardError,
              status,
            ] = eachLine.split(',');

            const csvData: CsvData = {
              yearMonth,
              monthOfRelease,
              passengerType,
              direction,
              sex,
              age,
              estimate,
              standardError,
              status,
            };

            const data = JSON.stringify(csvData);

            this.push(data);
          }

          counter++;
        }

        this.push(null);
      },
    });

    const mapToCsv = new Transform({
      transform(chunk, _, callback) {
        const csvData: CsvData = JSON.parse(chunk);

        const result = `${uuid()},${csvData.yearMonth},${translateGender(
          csvData.sex,
        )},${csvData.age}\n`;

        callback(null, result);
      },
    });

    const setHeader = new Transform({
      transform(chunk, _, callback) {
        if (counter) {
          return callback(null, chunk);
        }

        counter++;

        callback(null, `id,yearMonth,sex,age\n`.concat(chunk));
      },
    });

    await AsyncPipeline(
      readCsv,
      mapToCsv,
      setHeader,
      // process.stdout, // saida de dados no terminal
      // createWriteStream('translated.csv'), // para criar um arquivo físico
      response, // devolver para o nosso client
    );
  }
}

const translateGender = (gender: string) => {
  if (gender === 'Female') {
    return 'Feminino';
  }

  if (gender === 'Male') {
    return 'Masculino';
  }

  return 'Não informado';
};
