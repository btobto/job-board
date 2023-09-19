import { OmitStrict } from '../../shared/types';
import { Company } from './company.model';

export type CompanyUpdateDto = OmitStrict<
  Company,
  '_id' | 'email' | 'rating' | 'ratingsCount' | 'imagePath' | 'accessToken'
>;
