import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PersonRegister } from 'src/app/models';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, countryList } from 'src/app/shared/constants';
import { locationValidator } from 'src/app/shared/validators';
import { AppState } from 'src/app/state/app.state';
import { authActions } from 'src/app/state/auth';

@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss'],
})
export class RegisterPersonComponent implements OnInit {
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
    ],
    location: this.fb.group(
      {
        country: [''],
        city: [''],
      },
      { validators: locationValidator }
    ),
  });

  countries: string[] = countryList;

  constructor(private store: Store<AppState>, private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    const formValue = this.registerForm.getRawValue();
    this.sanitizeLocationData(formValue);
    // console.log(formValue);
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

  sanitizeLocationData(formValue: PersonRegister) {
    if (!formValue.location!.country.trim()) {
      delete formValue.location;
    } else if (!formValue.location!.city?.trim()) {
      delete formValue.location!.city;
    }
  }
}
