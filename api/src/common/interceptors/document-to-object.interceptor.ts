import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Document } from 'mongoose';
import { map, Observable } from 'rxjs';

function convertToObject(data: any) {
  return data instanceof Document ? data.toObject() : data;
}

@Injectable()
export class DocumentToObjectInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(convertToObject);
        }
        return convertToObject(data);
      }),
    );
  }
}
