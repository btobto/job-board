import { Company } from '../company/company.model';
import { Posting } from './posting.model';

export type PostingPopulated = Posting & {
  company: Pick<Company, '_id' | 'name' | 'imagePath' | 'rating' | 'ratingsCount'>;
};
