import { Location } from './location.model';

export interface Company {
  _id: string;
  name: string;
  email: string;
  website: string;
  description?: string;
  offices: Location[];
  rating: number;
}
