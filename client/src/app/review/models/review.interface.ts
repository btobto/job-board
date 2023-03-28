import { Company } from 'src/app/auth/models/company.interface';
import { User } from 'src/app/auth/models/user.interface';

export interface Review {
  _id: string;
  company: Company | string;
  user: User | string;
  rating: number;
  description?: string;
  datePosted: Date;
  dateUpdated?: Date;
}
