import { Company } from 'src/app/auth/models/company.interface';
import { Person } from 'src/app/auth/models/person.interface';
import { Location } from 'src/app/common/models/location.interface';

export interface Posting {
  _id: string;
  company: Company;
  location?: Location;
  position: string;
  description?: string;
  datePosted: Date;
  dateUpdated?: Date;
  remote?: boolean;
  salary?: string;
  requirements?: string[];
  applicants?: Person[];
}
