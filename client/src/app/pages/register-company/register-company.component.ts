import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, filter, tap } from 'rxjs';
import { Company, Location } from 'src/app/models';
import {
  COUNTRY_LIST,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  URL_REGEX,
} from 'src/app/shared/constants';
import { locationValidator } from 'src/app/shared/validators';
import { AppState } from 'src/app/state/app.state';
import { authActions } from 'src/app/state/auth';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss'],
})
export class RegisterCompanyComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private fb: NonNullableFormBuilder) {}

  countries = COUNTRY_LIST;
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
  locationValuesSub!: Subscription;

  ngOnInit(): void {
    this.locationValuesSub = this.locations.valueChanges
      .pipe(
        filter((locationsValues: Location[]) => locationsValues.length > 1),
        tap(console.log)
      )
      .subscribe((locationsValues: Location[]) =>
        locationsValues.slice(0, -1).forEach((loc, i) => {
          if (this.isFormGroupEmpty(loc)) this.locations.removeAt(i);
        })
      );
  }

  ngOnDestroy(): void {
    this.locationValuesSub.unsubscribe();
  }

  onSubmit() {
    const formValue = this.registerForm.getRawValue();
    this.sanitizeLocationData(formValue);
    console.log(formValue);
    this.store.dispatch(authActions.registerCompany({ payload: formValue }));
  }

  addLocation() {
    this.locations.push(this.createLocationGroup());
  }

  createLocationGroup() {
    return this.fb.group(
      {
        country: [''],
        city: [''],
        address: [''],
      },
      { validators: locationValidator }
    );
  }

  get canAddAnotherLocation(): boolean {
    const last = this.locations.controls.slice(-1)[0];
    return this.locations.valid && !this.isFormGroupEmpty(last.value);
  }

  isFormGroupEmpty(obj: Record<string, any>): boolean {
    return !Object.values(obj).some((v) => !!v);
  }

  sanitizeLocationData(formValue: Pick<Company, 'locations'> & Partial<Company>) {
    formValue.locations = formValue.locations
      .filter((loc) => !!loc.country.trim())
      .map((loc) => {
        if (!loc.city) {
          delete loc.city;
          delete loc.address;
        } else if (!loc.address) {
          delete loc.address;
        }
        return loc;
      });
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
