import { OmitStrict } from '../shared/types';
import { Company } from './company.model';

export type CompanyRegister = OmitStrict<Company, '_id' | 'description' | 'rating'> & {
  password: string;
};
