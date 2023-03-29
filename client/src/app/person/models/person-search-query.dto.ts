import { Location } from 'src/app/common/models/location.interface';

export interface PersonSearchQueryDto {
  name?: string;
  location?: Location;
  skills?: string[];
}
