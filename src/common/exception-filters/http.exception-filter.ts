import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();

    const request: Request = context.getRequest();
    const response: Response = context.getResponse();

    const statusCode = exception.getStatus(); // 400, 404, 409, 401, ...
    const message = exception.message;

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
