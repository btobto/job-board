import { ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enums';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return super.canActivate(context);
  }
}
