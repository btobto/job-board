import { OmitStrict } from '../shared/types';
import { Person } from './person.model';

export interface UpdatePersonDto {
  person: OmitStrict<Person, '_id' | 'email' | 'imagePath' | 'accessToken'>;
  image: File | null;
}
