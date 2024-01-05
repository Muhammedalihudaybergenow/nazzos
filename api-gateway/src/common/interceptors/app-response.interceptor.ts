import {
  CallHandler,
  ExecutionContext,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable()
export class AppResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = new Date().getTime();
    return next.handle().pipe(
      map((data) => ({
        payload: data,
        delay: new Date().getTime() - now,
        timestamp: new Date().getTime(),
      })),
      catchError((err) => {
        return throwError(() => {
          if (err instanceof HttpException) {
            const indexOfStatus = Object.values(HttpStatus).indexOf(
              err.getStatus() as number as HttpStatus,
            );
            throw new HttpException(
              {
                message: err.message || 'Internal Server Error',
                timestamp: new Date().getTime(),
                error: Object.keys(HttpStatus)[indexOfStatus] || 'error',
                statusCode: err.getStatus(),
              },
              err.getStatus() || 500,
            );
          }
          const indexOfStatus = Object.values(HttpStatus).indexOf(
            err.code as number as HttpStatus,
          );
          throw new HttpException(
            {
              message: err.message || 'Internal Server Error',
              timestamp: new Date().getTime(),
              error: Object.keys(HttpStatus)[indexOfStatus] || 'error',
              statusCode: err.code,
            },
            err.code || 500,
          );
        });
      }),
    );
  }
}
