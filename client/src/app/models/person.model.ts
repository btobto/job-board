import { Location } from './location.model';
import { WorkExperience } from './work-experience.model';

export interface Person {
  _id: string;
  name: string;
  email: string;
  location: Location;
  skills: string[];
  prevExperience: WorkExperience;
}
