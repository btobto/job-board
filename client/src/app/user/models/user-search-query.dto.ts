import { Location } from 'src/app/common/models/location.interface';

export interface UserSearchQueryDto {
  name?: string;
  location?: Location;
  skills?: string[];
}
