// interface CompanyRegister {
//   name: string;
//   email: string;
//   password: string;
//   website?: string;
//   description?: string;
// }

import { OmitStrict } from '../shared/types';
import { Company } from './company.model';

export type CompanyRegister = OmitStrict<
  Company,
  '_id' | 'offices' | 'rating'
> & {
  password: string;
};
