import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { USER_TYPE_KEY } from 'src/common/constants';
import { UserType } from 'src/common/enums';

export const RoleGuard = (role: UserType): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const userType = context.switchToHttp().getRequest()[USER_TYPE_KEY];
      return userType === role;
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};
