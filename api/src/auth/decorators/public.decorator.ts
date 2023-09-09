import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/common/constants';

export const Public = (setPublic = true) => SetMetadata(IS_PUBLIC_KEY, setPublic);
