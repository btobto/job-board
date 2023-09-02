import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Location, PersonRegister } from 'src/app/models';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'src/app/shared/constants';
import { removeEmptyValuesFromObject } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { authActions } from 'src/app/state/auth';

@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss'],
})
export class RegisterPersonComponent implements OnInit {
  constructor(private store: Store<AppState>, private fb: NonNullableFormBuilder) {}
  ngOnInit(): void {}

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(NAME_MIN_LENGTH), Validators.maxLength(NAME_MAX_LENGTH)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
    ],
    location: this.fb.control<Location>({ value: { country: '' }, disabled: false }),
  });

  onSubmit() {
    const formValue = removeEmptyValuesFromObject(this.registerForm.getRawValue());
    console.log(formValue);
    this.store.dispatch(authActions.registerPerson({ payload: formValue }));
  }

  get name() {
    return this.registerForm.get('name')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get location() {
    return this.registerForm.get('location')!;
  }
}
