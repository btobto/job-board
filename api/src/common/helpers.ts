import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export function shouldSkipInterceptor(
  reflector: Reflector,
  context: ExecutionContext,
  interceptorKey: string,
): boolean {
  const skip = reflector.getAllAndOverride<boolean>(interceptorKey, [
    context.getHandler(),
    context.getClass(),
  ]);
  return skip === true;
}
