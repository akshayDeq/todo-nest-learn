import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // if the response is of type object
    function encryptObject(object: any): any {
      if (typeof object === 'object') {
        const keys = Object.keys(object);
        keys.forEach(
          (val) =>
            (object[val] = Buffer.from(object[val].toString()).toString(
              'base64',
            )),
        );
        return object;
      }

      if (typeof object === 'string' || 'number') {
        return Buffer.from(object.toString()).toString('base64');
      }
      return {};
    }

    // if the response is of type array of objects
    function encryptArray(object: Array<string>): Array<string> {
      const deepCopy = JSON.parse(JSON.stringify(object));
      const isArray = Array.isArray(deepCopy);
      if (isArray) {
        const keys = Object.keys(deepCopy[0]);
        deepCopy.forEach((val) =>
          keys.forEach(
            (key) =>
              (val[key] = Buffer.from(val[key].toString()).toString('base64')),
          ),
        );
        return deepCopy;
      }
      return encryptObject(deepCopy);
    }
    return next.handle().pipe(
      tap(() => {
        console.log('=====================================');
        // print the request url
        console.log('Path => ', request.path);
        // print the request method
        console.log('Request Type =>', request.method);

        // print the request body
        if (Object.keys(request.body).length) {
          console.log('Body => ', encryptArray(request.body));
        }
        // print the request paramaters
        if (Object.keys(request.params).length) {
          console.log('Params => ', encryptArray(request.params));
        }
        // print the status code
        console.log('Status Code => ', encryptArray(response.statusCode));
      }),

      map((data) => {
        // Data is the return value of the route

        // print the response data on console
        console.log('Response => ', encryptArray(data));
        console.log('=====================================');
        return data;
      }),
    );
  }
}
