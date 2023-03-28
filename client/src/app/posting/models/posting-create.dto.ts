import { Location } from 'src/app/common/models/location.interface';

export interface PostingCreateDto {
  location?: Location;
  position: string;
  description?: string;
  remote: string;
  requirements: string[];
}
