import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Location } from 'src/app/models';

export const LOCATION_VALIDATOR_KEY = 'emptyLocationFields';

export const locationValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const valid = Object.values((group as FormGroup).controls)
    .map((c) => !!c)
    .every((v, i, a) => !i || v <= a[i - 1]);

  return valid ? null : { [LOCATION_VALIDATOR_KEY]: true };
};
