import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(BadRequestException)
export class DtoExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as any;
    let errorDetails = [];

    if (
      exceptionResponse?.message &&
      Array.isArray(exceptionResponse.message)
    ) {
      const validationErrors = exceptionResponse.message;
      const errorsMap = new Map<string, string[]>();

      validationErrors.forEach((error) => {
        const match = error.match(/(^[a-zA-Z0-9_]+) (.+)/);
        if (match) {
          const field = match[1];
          const errorDescription = match[2];
          if (!errorsMap.has(field)) {
            errorsMap.set(field, []);
          }
          errorsMap.get(field)?.push(errorDescription);
        }
      });

      errorDetails = Array.from(errorsMap).map(([field, errors]) => ({
        field,
        errors,
      }));
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorDetails,
      error: exceptionResponse.error ? exceptionResponse.error : 'Bad Request',
    });
  }
}
