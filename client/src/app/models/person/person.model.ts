import { Education } from '../shared/education.model';
import { Location } from '../shared/location.model';
import { WorkExperience } from '../shared/work-experience.model';

export interface Person {
  _id: string;
  name: string;
  email: string;
  about?: string;
  location?: Location;
  skills: string[];
  prevExperience: WorkExperience[];
  education: Education[];
  imagePath?: string;
  accessToken?: string;
}
