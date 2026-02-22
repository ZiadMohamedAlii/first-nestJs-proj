import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  // this function used as decorator in userController
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {} //NOW we can use this serialization everywhere

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run before request

    // runs after request
    return next.handle().pipe(
      map((data: any) => {
        // return data before the response
        // data is the real user entity

        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
