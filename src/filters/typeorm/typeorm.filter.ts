import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  LoggerService,
} from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    const responseData = {
      code: 500,
      path: request.url,
      message: exception.message,
    };

    if (exception instanceof QueryFailedError) {
      responseData.code = exception.driverError.errno;
      responseData.message = exception.driverError.message;
    }

    this.logger.warn(exception);
    response.status(290).json(responseData);
  }
}
