import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  mixin,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { USER_TYPE_KEY } from 'src/common/constants';
import { Role } from '../enums';

export const LocalAuthGuard = (role: Role): Type<CanActivate> => {
  class LocalAuthGuardMixin extends AuthGuard('local') {
    canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest();
      req[USER_TYPE_KEY] = role;

      return super.canActivate(context);
    }
  }

  const guard = mixin(LocalAuthGuardMixin);
  return guard;
};
