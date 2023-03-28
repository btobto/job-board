import { Location } from 'src/app/common/models/location.interface';
import { UserBase } from './user-base.interface';

export interface Company extends UserBase {
  website: string;
  description: string;
  offices: Location[];
  rating: number;
  ratingsCount: number;
}
