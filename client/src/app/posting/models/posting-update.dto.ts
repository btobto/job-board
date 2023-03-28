import { Location } from 'src/app/common/models/location.interface';

export interface PostingUpdateDto {
  location?: Location;
  position?: string;
  description?: string;
  remote?: boolean;
  requirements?: string[];
}
