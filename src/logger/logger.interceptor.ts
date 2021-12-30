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

    // function to encrypt data in JS object
    function encryptObject(object: any): any {
      // if the object is a js object datatype
      if (typeof object === 'object') {
        const keys = Object.keys(object);

        // logic to encode the values of object
        keys.forEach(
          (val) =>
            // encode string to base64
            (object[val] = Buffer.from(object[val].toString()).toString(
              'base64',
            )),
        );
        return object;
      }

      // if data type of object is string or number
      if (typeof object === 'string' || 'number') {
        // encode string to base64
        return Buffer.from(object.toString()).toString('base64');
      }
      return {};
    }

    // function to encrypt data in array of objects
    function encryptArray(object: Array<string>): Array<string> {
      // create a deep copy of the object to log
      const deepCopy = JSON.parse(JSON.stringify(object));

      // check if object is an array
      const isArray = Array.isArray(deepCopy);
      if (isArray) {
        // logic to encode the values of object array
        const keys = Object.keys(deepCopy[0]);
        deepCopy.forEach((val) =>
          keys.forEach(
            (key) =>
              // encode string to base64
              (val[key] = Buffer.from(val[key].toString()).toString('base64')),
          ),
        );
        return deepCopy;
      }
      // if the object is not an array call the encrypt object function
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
