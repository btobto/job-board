import { UserType } from 'src/app/common/enums/user-type.enum';
import { Location } from 'src/app/common/models/location.interface';
import { UserBase } from './user-base.interface';

export interface Company extends UserBase {
  type: 'company';
  website: string;
  description: string;
  offices: Location[];
  rating: number;
  ratingsCount: number;
}
