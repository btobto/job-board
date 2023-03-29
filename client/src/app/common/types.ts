import { Company } from '../auth/models/company.interface';
import { Person } from '../auth/models/person.interface';

export type User = Person | Company;
