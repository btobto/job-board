import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models';
import { getUserType } from '../shared/helpers';
import { UserType } from '../shared/enums';

@Pipe({
  name: 'userTypeof',
  pure: true,
})
export class UserTypeofPipe implements PipeTransform {
  transform(value: User, ...args: unknown[]): UserType {
    return getUserType(value);
  }
}
