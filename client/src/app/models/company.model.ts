import { Location } from './location.model';

export interface Company {
  _id: string;
  name: string;
  email: string;
  website: string;
  about?: string;
  locations: Location[];
  rating: number;
  ratingsCount: number;
  imagePath?: string;
  accessToken?: string;
}
