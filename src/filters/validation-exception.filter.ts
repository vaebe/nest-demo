// src/filters/validation-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse()['message'] || 'Validation failed';

    const responseData = {
      statusCode: status,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      message: message,
    };

    this.logger.error(responseData);

    response.status(status).json(responseData);
  }
}
