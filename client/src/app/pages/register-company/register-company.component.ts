import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Subscription, filter, tap } from 'rxjs';
import { Company, CompanyRegister, Location } from 'src/app/models';
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  URL_REGEX,
} from 'src/app/shared/constants';
import { removeEmptyValuesFromObject } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { authActions } from 'src/app/state/auth';

@UntilDestroy()
@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss'],
})
export class RegisterCompanyComponent implements OnInit {
  constructor(private store: Store<AppState>, private fb: NonNullableFormBuilder) {}

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(NAME_MIN_LENGTH), Validators.maxLength(NAME_MAX_LENGTH)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
    ],
    website: ['', [Validators.required, Validators.pattern(URL_REGEX)]],
    locations: this.fb.array([this.createLocationGroup()]),
  });

  ngOnInit(): void {
    this.locations.valueChanges
      .pipe(
        filter((locationsValues: Location[]) => locationsValues.length > 1),
        tap(console.log),
        untilDestroyed(this)
      )
      .subscribe((locationsValues: Location[]) =>
        locationsValues.slice(0, -1).forEach((loc, i) => {
          if (this.isFormGroupEmpty(loc)) this.locations.removeAt(i);
        })
      );
  }

  onSubmit() {
    const formValue = removeEmptyValuesFromObject(this.registerForm.getRawValue());
    console.log(formValue);
    this.store.dispatch(authActions.registerCompany({ payload: formValue }));
  }

  addLocation() {
    this.locations.push(this.createLocationGroup());
  }

  createLocationGroup() {
    return this.fb.control<Location>({ country: '', city: '', address: '' });
  }

  get canAddAnotherLocation(): boolean {
    const last = this.locations.controls.slice(-1)[0];
    return this.locations.valid && !this.isFormGroupEmpty(last.value);
  }

  isFormGroupEmpty(obj: Record<string, any>): boolean {
    return !Object.values(obj).some((v) => !!v);
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

  get website() {
    return this.registerForm.get('website')!;
  }

  get locations() {
    return this.registerForm.get('locations') as FormArray;
  }
}
