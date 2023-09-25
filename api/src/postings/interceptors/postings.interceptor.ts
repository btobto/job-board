import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { USER_TYPE_KEY } from '../../common/constants';
import { UserType } from '../../common/enums';
import { Reflector } from '@nestjs/core';
import { shouldSkipInterceptor } from 'src/common/helpers';

export const POSTINGS_INTERCEPTOR_KEY = 'postingInterceptor';

function appendApplied(userId: string, posting: any) {
  const applicants = posting.applicants;
  return {
    ...posting.toJSON(),
    applied: applicants.map((id) => id.toString()).includes(userId),
  };
}

@Injectable()
export class PostingsInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (shouldSkipInterceptor(this.reflector, context, POSTINGS_INTERCEPTOR_KEY)) {
      // console.log('Skipping postings interceptor...');
      return next.handle();
    }

    const req = context.switchToHttp().getRequest();
    const userType = req[USER_TYPE_KEY];
    const userId = req.user['_id'];

    return next.handle().pipe(
      map((data) => {
        if (userType === UserType.Person) {
          if (Array.isArray(data)) {
            return data.map((posting) => appendApplied(userId, posting));
          } else {
            return appendApplied(userId, data);
          }
        }

        return data;
      }),
      // tap(console.log),
    );
  }
}
