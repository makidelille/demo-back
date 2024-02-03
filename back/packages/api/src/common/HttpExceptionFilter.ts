import { DomainError } from '@back/domain';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(DomainError)
export class HttpDomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = exception.statusCode;
    const message = exception.message;

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
