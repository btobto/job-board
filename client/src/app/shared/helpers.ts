import { Company, Person } from '../models';
import { UserType } from './enums/user-type.enum';

export function getUserType<T>(user: Partial<Person> | (Pick<Company, 'website'> & Partial<Company>)): UserType {
  if ('website' in user) {
    return UserType.Company;
  }
  return UserType.Person;
}

export function isNotNull<T>(val: T): val is NonNullable<T> {
  return val != null;
}
