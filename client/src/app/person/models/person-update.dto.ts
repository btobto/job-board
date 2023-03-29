import { Location } from 'src/app/common/models/location.interface';
import { WorkExperience } from 'src/app/common/models/work-experience.interface';

export interface PersonUpdateDto {
  name?: string;
  location?: Location;
  skills?: string[];
  prevExperience?: WorkExperience[];
}
