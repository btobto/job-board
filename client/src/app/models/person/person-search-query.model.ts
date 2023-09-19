import { Location } from '../shared/location.model';

export interface PersonSearchQuery {
  name?: string;
  location?: Partial<Location>;
  skills?: string[];
}
