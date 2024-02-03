import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoggingServiceInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const request = context.switchToHttp().getRequest();
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';
        const { status } = error;
        this.logger.error(
          `Error: ${method} ${status} ${originalUrl} - ${userAgent} ${ip}`,
          context.getClass().name,
        );
        console.log(error);
        return throwError(() => error);
      }),
    );
  }
}
