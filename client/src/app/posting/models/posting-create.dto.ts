import { Location } from 'src/app/common/models/location.interface';
import { LocationQuery } from 'src/app/person/models/person-search-query.dto';

export interface PostingCreateDto {
  location?: LocationQuery;
  position: string;
  description?: string;
  remote: boolean;
  salary?: string;
  requirements: string[];
}
