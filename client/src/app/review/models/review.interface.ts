import { Company } from 'src/app/auth/models/company.interface';
import { Person } from 'src/app/auth/models/person.interface';

export interface Review {
  _id: string;
  company: Company | string;
  person: string;
  rating: number;
  description?: string;
  datePosted: Date;
  dateUpdated?: Date;
}
