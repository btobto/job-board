import { Person } from './person.model';

export type PersonRegister = Pick<Person, 'name' | 'email'> & {
  password: string;
};
