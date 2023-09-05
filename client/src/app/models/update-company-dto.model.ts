import { OmitStrict } from '../shared/types';
import { Company } from './company.model';

export type UpdateCompanyDto = OmitStrict<Company, '_id' | 'email' | 'rating' | 'imagePath' | 'accessToken'>;
