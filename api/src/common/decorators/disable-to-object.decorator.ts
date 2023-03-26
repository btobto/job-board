import { SetMetadata } from '@nestjs/common';

export const DONT_CONVERT_DOC_KEY = 'dontConvertDoc';
export const DisableToObject = () => SetMetadata(DONT_CONVERT_DOC_KEY, true);
