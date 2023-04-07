import { createParamDecorator, ExecutionContext, mixin } from '@nestjs/common';
import { User } from 'src/common/types';
import { Person } from 'src/persons/schemas';

export const ActiveUser = <T = User>(field?: keyof T): ParameterDecorator => {
  return createParamDecorator((field: keyof T, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return field ? user?.[field] : user;
  })(field);
};
