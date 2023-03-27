import { ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enums';

export const USER_TYPE_KEY = 'userType';

export const LocalAuthGuard = (role: Role) => {
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
