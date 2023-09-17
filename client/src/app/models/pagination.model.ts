import { OmitStrict } from '../shared/types';
import { PaginationResult } from './pagination-result.model';

export type Pagination = OmitStrict<PaginationResult<any>, 'data'>;
