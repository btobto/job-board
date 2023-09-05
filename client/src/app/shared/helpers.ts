import { environment } from 'src/environments/environment';
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

export function getUserImageUrl(user: User): string {
  return user.imagePath ? environment.mediaUrl + '/' + user.imagePath : './assets/images/user-default-icon.png';
}

export function objectsAreEqual(val1: any, val2: any): boolean {
  return typeof val1 === 'object' && typeof val1 === typeof val2
    ? Object.keys(val1).length === Object.keys(val2).length &&
        Object.keys(val1).every((key) => objectsAreEqual(val1[key], val2[key]))
    : val1 === val2;
}
