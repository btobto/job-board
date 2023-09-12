import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { USER_TYPE_KEY } from '../constants';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '../enums';

function appendApplied(userId: string, posting: any) {
  const applicants = posting.applicants;
  return {
    ...posting.toObject(),
    applied: applicants.includes(userId),
  };
}

@Injectable()
export class PostingInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization'].replace('Bearer ', '');
    const decoded = this.jwtService.decode(token);
    const userId = req.user['_id'];

    return next.handle().pipe(
      map((data) => {
        if (decoded[USER_TYPE_KEY] === UserType.Person) {
          if (Array.isArray(data)) {
            return data.map((posting) => appendApplied(userId, posting));
          } else {
            return appendApplied(userId, data);
          }
        }
        return data;
      }),
    );
  }
}
