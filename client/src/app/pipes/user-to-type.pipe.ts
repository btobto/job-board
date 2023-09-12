import { Pipe, PipeTransform } from '@angular/core';
import { Company, Person, User } from '../models';
import { UserType } from '../shared/enums';

@Pipe({
  name: 'userToType',
  pure: true,
})
export class UserToTypePipe implements PipeTransform {
  transform(value: User, type: UserType) {
    return type === UserType.Company ? (value as Company) : (value as Person);
  }
}
