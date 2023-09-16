import { OmitStrict } from '../shared/types';
import { Posting } from './posting.model';

export type PostingDto = OmitStrict<Posting, '_id' | 'company' | 'datePosted' | 'applied'>;
