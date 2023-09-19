import { Location } from '../shared/location.model';

export interface Posting {
  _id: string;
  company: string;
  location?: Location;
  position: string;
  description?: string;
  datePosted: Date;
  remoteAvailable: boolean;
  salary?: string;
  requirements: string[];
  applied?: boolean;
}
