import { OmitStrict } from '../shared/types';
import { Person } from './person.model';

export type PersonUpdateDto = OmitStrict<Person, '_id' | 'email' | 'imagePath' | 'accessToken'>;
