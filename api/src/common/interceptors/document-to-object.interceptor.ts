import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Document } from 'mongoose';
import { iif, map, Observable } from 'rxjs';
import { DONT_CONVERT_DOC_KEY } from '../decorators';

function convertToObject(data: any) {
  return data instanceof Document ? data.toObject() : data;
}

@Injectable()
export class DocumentToObjectInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dontConvert = this.reflector.getAllAndOverride<boolean>(
      DONT_CONVERT_DOC_KEY,
      [context.getHandler(), context.getClass()],
    );

    return dontConvert
      ? next.handle()
      : next.handle().pipe(
          map((data) => {
            if (Array.isArray(data)) {
              return data.map(convertToObject);
            }
            return convertToObject(data);
          }),
        );
  }
}
