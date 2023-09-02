import { Company, Person, User } from '../models';
import { UserType } from './enums/user-type.enum';

export function getUserType<T>(user: Partial<User>): UserType {
  if (['website', 'locations', 'rating'].some((key) => key in user)) {
    return UserType.Company;
  }
  return UserType.Person;
}

export function isNotNull<T>(val: T): val is NonNullable<T> {
  return val != null;
}

export function removeEmptyValuesFromObject(obj: Record<string, any> | any[]): any {
  if (Array.isArray(obj)) {
    return obj
      .map((v) => (typeof v === 'object' && v !== null ? removeEmptyValuesFromObject(v) : v))
      .filter((v) => !!v && Object.keys(v).length);
  } else {
    return Object.fromEntries(
      Object.entries(obj)
        .map(([k, v]) => (typeof v === 'object' && v !== null ? [k, removeEmptyValuesFromObject(v)] : [k, v]))
        .filter(([_, v]) => Array.isArray(v) || (!!v && (typeof v === 'object' ? Object.keys(v).length : true)))
    );
  }
}
