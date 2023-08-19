import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { LOCATION_VALIDATOR_KEY } from 'src/app/shared/validators';

@Component({
  selector: 'app-control-error-message',
  templateUrl: './control-error-message.component.html',
  styleUrls: ['./control-error-message.component.scss'],
})
export class ControlErrorMessageComponent {
  @Input() controlName!: string;
  @Input() control!: AbstractControl;

  get errorMessage(): string {
    const key = Object.getOwnPropertyNames(this.control.errors)[0];
    return this.constructErrorMessage(key, this.control.errors![key]);
  }

  constructErrorMessage(key: string, errors?: { [key: string]: any }) {
    switch (key) {
      case 'required':
        return `${this.controlName} must not be empty.`;
      case 'minlength':
        return `${this.controlName} must be at least ${
          errors!['requiredLength']
        } characters long.`;
      case 'maxlength':
        return `${this.controlName} length must not exceed ${
          errors!['requiredLength']
        } characters.`;
      case 'email':
        return 'Not a valid email address.';
      case LOCATION_VALIDATOR_KEY:
        return 'Previous location fields must not be empty.';
      default:
        return 'Invalid input.';
    }
  }
}
