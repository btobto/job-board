import { OmitStrict } from '../shared/types';
import { Company } from './company.model';

export type CompanyRegister = Pick<Company, 'name' | 'email' | 'website' | 'locations'> & {
  password: string;
};
