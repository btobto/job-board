import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models';
import { getUserType } from '../shared/helpers';

@Pipe({
  name: 'userTypeof',
})
export class UserTypeofPipe implements PipeTransform {
  transform(value: User, ...args: unknown[]) {
    return getUserType(value);
  }
}
