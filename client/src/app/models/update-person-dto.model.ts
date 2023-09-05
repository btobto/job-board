import { OmitStrict } from '../shared/types';
import { Person } from './person.model';

export type UpdatePersonDto = OmitStrict<Person, '_id' | 'email' | 'imagePath' | 'accessToken'>;
