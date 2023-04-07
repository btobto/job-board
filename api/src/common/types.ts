import { Company } from 'src/companies/schemas';
import { Person } from 'src/persons/schemas';

export type User = Person | Company;
