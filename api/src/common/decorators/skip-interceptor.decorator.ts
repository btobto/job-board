import { SetMetadata } from '@nestjs/common';

export const SkipInterceptor = (
  interceptorKey: string,
  shouldSkip: boolean = true,
) => SetMetadata(interceptorKey, shouldSkip);
