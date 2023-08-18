import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { countryList } from 'src/app/shared/constants';
import { locationValidator } from 'src/app/shared/validators';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss'],
})
export class RegisterPersonComponent implements OnInit {
  registerForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(25)],
    ],
    location: this.fb.group(
      {
        country: [''],
        city: [''],
      },
      { validators: locationValidator }
    ),
  });

  countries: string[] = [];

  constructor(
    private store: Store<AppState>,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.countries = countryList;
  }

  onSubmit() {
    const value = this.registerForm.value as Required<
      typeof this.registerForm.value
    >;
    const formValue = this.registerForm.getRawValue();
    console.log(formValue);
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
}
