import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { USER_TYPE_KEY } from '../../common/constants';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '../../common/enums';
import mongoose, { Document } from 'mongoose';
import { Posting } from 'src/postings/schemas';
import { Reflector } from '@nestjs/core';

export const POSTING_INTERCEPTOR_KEY = 'postingInterceptor';

function appendApplied(userId: string, posting: any) {
  const applicants = posting.applicants;
  return {
    ...posting.toObject(),
    applied: applicants.map((id) => id.toString()).includes(userId),
  };
}

@Injectable()
export class PostingsInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (this.shouldSkip(context)) {
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

  shouldSkip(context: ExecutionContext): boolean {
    const skip = this.reflector.getAllAndOverride<boolean>(
      POSTING_INTERCEPTOR_KEY,
      [context.getHandler(), context.getClass()],
    );
    return skip === true;
  }
}
