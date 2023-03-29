import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ResourceOwhershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    // console.log('fdsfs', req.params['id'], req.user['_id']);
    return req.params['id'] === req.user['_id'];
  }
}
