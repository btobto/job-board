import { environment } from 'src/environments/environment';
import { Company, Person, User, Location } from '../models';
import { UserType } from './enums';
import { Observable, debounceTime, distinctUntilChanged, filter, fromEvent, map, tap } from 'rxjs';
import { IMAGES_PATH } from './constants';

export function getUserType(user: Partial<User>): UserType {
  if (['website', 'locations', 'rating'].some((key) => key in user)) {
    return UserType.Company;
  }
  return UserType.Person;
}

export function isNotNull<T>(val: T): val is NonNullable<T> {
  return val != null;
}

export function filterNull<T>() {
  return (source: Observable<T>) => source.pipe(filter(isNotNull));
}

export function searchPipe<T>(time: number = 400) {
  return (source: Observable<T>) =>
    source.pipe(
      debounceTime(time),
      distinctUntilChanged((a, b) => objectsAreEqual(a, b)),
      map((query) => (query ? removeEmptyValuesFromObject(query, true) : query)),
      filter((query) => objectIsNotEmpty(query))
    );
}

export function inputValueObservable(input: HTMLInputElement): Observable<string> {
  return fromEvent(input, 'keyup').pipe(map((event) => (event.target as HTMLInputElement).value));
}

export function getUserImageUrl(user: Partial<User>): string {
  return user.imagePath ? environment.mediaUrl + '/' + user.imagePath : getDefaultImageUrl(user);
}

export function getDefaultImageUrl(user: Partial<User>): string {
  return (
    `${IMAGES_PATH}/` + (getUserType(user) === UserType.Person ? 'user-default-icon.png' : 'company-default-icon.png')
  );
}

export function getLocationString(location: Location): string {
  return Object.values(location).join(', ');
}

export function isSameUser(user1: User, user2: User): boolean {
  return getUserType(user1) === getUserType(user2) && user1._id === user2._id;
}

export function objectIsNotEmpty(obj: any) {
  for (let k in obj) {
    return true;
  }
  return false;
}

export function objectsAreEqual(val1: any, val2: any): boolean {
  return typeof val1 === 'object' && typeof val1 === typeof val2
    ? Object.keys(val1).length === Object.keys(val2).length &&
        Object.keys(val1).every((key) => objectsAreEqual(val1[key], val2[key]))
    : val1 === val2;
}

export function removeEmptyValuesFromObject(obj: Record<string, any> | any[], removeEmptyArrays: boolean = false): any {
  if (Array.isArray(obj)) {
    return obj
      .map((v) => (typeof v === 'object' && v !== null ? removeEmptyValuesFromObject(v) : v))
      .filter((v) => v != null && v !== '' && Object.keys(v).length);
  } else {
    return Object.fromEntries(
      Object.entries(obj)
        .map(([k, v]) => (typeof v === 'object' && v !== null ? [k, removeEmptyValuesFromObject(v)] : [k, v]))
        .filter(
          ([_, v]) =>
            (!removeEmptyArrays && Array.isArray(v)) ||
            (v != null && v !== '' && (typeof v === 'object' ? Object.keys(v).length : true))
        )
    );
  }
}
