import { Location } from 'src/app/common/models/location.interface';

export interface PostingSearchQueryDto {
  location?: Location;
  position?: string;
  description?: string;
  datePosted?: Date;
  remote?: boolean;
  requirements?: string[];
}
