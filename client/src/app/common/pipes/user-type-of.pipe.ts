import { Pipe, PipeTransform } from '@angular/core';
import { UserType } from '../enums/user-type.enum';
import { User } from '../types';

@Pipe({
  name: 'UserTypeOf',
})
export class UserTypeOfPipe implements PipeTransform {
  transform(user: User): UserType | undefined {
    if ('skills' in user) {
      return UserType.Person;
    } else if ('offices' in user) {
      return UserType.Company;
    } else {
      return undefined;
    }
  }
}
