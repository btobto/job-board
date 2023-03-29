import { Location } from 'src/app/common/models/location.interface';

export interface LocationQuery {
  country?: string;
  city?: string;
}

export interface PersonSearchQueryDto {
  name?: string;
  location?: LocationQuery;
  skills?: string[];
}
