import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { EMPTY_ERROR_KEY } from 'src/app/shared/constants';
import { LOCATION_VALIDATOR_KEY, YEAR_SPAN_VALIDATOR_KEY } from 'src/app/shared/validators';

@Component({
  selector: 'app-control-error-message',
  templateUrl: './control-error-message.component.html',
  styleUrls: ['./control-error-message.component.scss'],
})
export class ControlErrorMessageComponent {
  @Input() controlName = 'Field';
  @Input() control!: AbstractControl;

  get errorMessage(): string | null {
    if (!this.control.errors) return null;

    // console.log('[Error control]: ', this.controlName, this.control.errors, this.control.valid);
    const key = Object.getOwnPropertyNames(this.control.errors)[0];
    return this.constructErrorMessage(key, this.control.errors![key]);
  }

  constructErrorMessage(key: string, errors?: { [key: string]: any }): string | null {
    switch (key) {
      case 'required':
        return `${this.controlName} must not be empty.`;
      case 'minlength':
        return `${this.controlName} must be at least ${errors!['requiredLength']} characters long.`;
      case 'maxlength':
        return `${this.controlName} length must not exceed ${errors!['requiredLength']} characters.`;
      case 'min':
        return `${this.controlName} value too small.`;
      case 'max':
        return `${this.controlName} value too big.`;
      case 'email':
        return 'Not a valid email address.';
      case 'pattern':
        return `${this.controlName} is not valid.`;
      case LOCATION_VALIDATOR_KEY:
        return 'Previous location fields must not be empty.';
      case YEAR_SPAN_VALIDATOR_KEY:
        return 'Year from cannot be greater than year to.';
      case EMPTY_ERROR_KEY:
        return null;
      default:
        return 'Invalid input.';
    }
  }
}
