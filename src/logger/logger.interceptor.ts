import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => {
        console.log('=====================================');
        console.log('Path => ', request.path);
        console.log('Request Type =>', request.method);
        if (Object.keys(request.body).length) {
          console.log('Body => ', request.body);
        }
        if (Object.keys(request.params).length) {
          console.log('Params => ', request.params);
        }
        console.log('Status Code =>', response.statusCode);
      }),

      map((data) => {
        // Data is the return value of the route
        console.log('Response => ', data);
        console.log('=====================================');
        return data;
      }),

      catchError(() => {
        console.error('interceptor error');
        throw new HttpException({ message: 'interceptor error' }, 500);
      }),
    );
  }
}
