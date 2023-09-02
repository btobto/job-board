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
  @Input() index = 0;
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
      this.locationGroup.setValue({
        country: location.country,
        city: location.city ?? '',
        address: location.address ?? '',
      });
    }
  }

  registerOnChange(onChange: (value: Partial<Location>) => void): void {
    this.onChangeSub = this.locationGroup.valueChanges.subscribe(onChange);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disable: boolean): void {
    disable ? this.locationGroup.disable() : this.locationGroup.enable();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    // console.log(this.locationGroup.errors);
    return this.locationGroup.errors;
  }
}
