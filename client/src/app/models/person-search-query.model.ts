import { Location } from './location.model';

export interface PersonSearchQuery {
  name?: string;
  location?: Partial<Location>;
  skills?: string[];
}
