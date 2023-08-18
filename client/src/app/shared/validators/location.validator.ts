import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Location } from 'src/app/models';

export const locationValidator: ValidatorFn = (
  group: AbstractControl<Location>
): ValidationErrors | null => {
  const country = group.get('country');
  const city = group.get('city');
  const address = group.get('address');

  const valid = [country, city, address]
    .map((c) => !!c)
    .every((v, i, a) => !i || v <= a[i - 1]);

  return valid ? null : { emptyFields: true };
};
