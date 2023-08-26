import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const YEAR_SPAN_VALIDATOR_KEY = 'yearFields';

export const yearSpanValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const from = group.get('yearFrom')!;
  const to = group.get('yearTo');

  if (!to || (to && from <= to)) return null;
  else return { [YEAR_SPAN_VALIDATOR_KEY]: true };
};
