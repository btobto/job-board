import { Component, Input, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/models';
import { COUNTRY_LIST } from 'src/app/shared/constants';
import { locationValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-location-form-group',
  templateUrl: './location-form-group.component.html',
  styleUrls: ['./location-form-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: LocationFormGroupComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: LocationFormGroupComponent,
    },
  ],
})
export class LocationFormGroupComponent implements ControlValueAccessor, Validator, OnDestroy {
  countries: string[] = COUNTRY_LIST;
  @Input() hasAddress: boolean = true;

  onTouched = () => {};
  onChangeSub!: Subscription;

  locationGroup = this.fb.group(
    {
      country: [''],
      city: [''],
      address: [''],
    },
    { validators: locationValidator }
  );

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

  writeValue(location: Location): void {
    if (location) {
      const country = location.country ?? '';
      const city = location.city ?? '';
      const address = location.address ?? '';
      this.locationGroup.setValue({ country, city, address });
    }
  }

  registerOnChange(onChange: (value: Partial<Location>) => void): void {
    this.onChangeSub = this.locationGroup.valueChanges.subscribe((value) => {
      onChange(Object.fromEntries(Object.entries(value).filter(([_, v]) => !!v)));
    });
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.locationGroup.disable() : this.locationGroup.enable();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.locationGroup.errors;
  }
}
