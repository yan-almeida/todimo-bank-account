import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception-filters/http.exception-filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { IntPipe } from './common/pipes/int.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Web API - Todimo')
    .setDescription('API responsável: Todimo')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
    new IntPipe(),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new TimeoutInterceptor(),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
  const url = await app.getUrl();

  Logger.debug(`Swagger application is running on: ${url}/swagger`);
}
bootstrap();
