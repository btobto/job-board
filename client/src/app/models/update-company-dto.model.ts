import { OmitStrict } from '../shared/types';
import { Company } from './company.model';

export interface UpdateCompanyDto {
  company: OmitStrict<Company, '_id' | 'email' | 'rating' | 'imagePath' | 'accessToken'>;
  image: File | null;
}
