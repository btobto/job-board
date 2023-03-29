import { UserType } from 'src/app/common/enums/user-type.enum';
import { Location } from 'src/app/common/models/location.interface';
import { WorkExperience } from 'src/app/common/models/work-experience.interface';
import { UserBase } from './user-base.interface';

export interface Person extends UserBase {
  location: Location;
  skills: string[];
  prevExperience: WorkExperience[];
}
