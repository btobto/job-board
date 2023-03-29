import { Location } from 'src/app/common/models/location.interface';
import { LocationQuery } from 'src/app/person/models/person-search-query.dto';

export interface PostingSearchQueryDto {
  location?: LocationQuery;
  position?: string;
  description?: string;
  datePosted?: Date;
  remote?: boolean;
  requirements?: string[];
}
