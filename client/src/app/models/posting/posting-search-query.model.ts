import { Location } from '../shared/location.model';

export interface PostingSearchQuery {
  position?: string;
  location?: Partial<Location>;
  remoteAvailable?: boolean;
  requirements?: string[];
}
