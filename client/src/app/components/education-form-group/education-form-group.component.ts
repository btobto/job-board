import { Component, Input, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Education } from 'src/app/models';
import { EMPTY_ERROR_KEY, MAX_GRADE, MAX_YEAR, MIN_GRADE, MIN_YEAR } from 'src/app/shared/constants';
import { yearSpanValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-education-form-group',
  templateUrl: './education-form-group.component.html',
  styleUrls: ['./education-form-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: EducationFormGroupComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: EducationFormGroupComponent,
    },
  ],
})
export class EducationFormGroupComponent implements ControlValueAccessor, Validator, OnDestroy {
  constructor(private fb: NonNullableFormBuilder) {}

  @Input() index = 0;

  minYear = MIN_YEAR;
  maxYear = MAX_YEAR;
  minGrade = MIN_GRADE;
  maxGrade = MAX_GRADE;
  isCurrentlyStudying = false;

  onTouched = () => {};
  onChangeSub!: Subscription;

  educationGroup = this.fb.group(
    {
      school: ['', Validators.required],
      degree: [''],
      grade: [0, [Validators.min(MIN_GRADE), Validators.max(MAX_GRADE)]],
      yearFrom: [MAX_YEAR, [Validators.required, Validators.min(MIN_YEAR), Validators.max(MAX_YEAR)]],
      yearTo: this.fb.control<number | null>(null, [
        Validators.required,
        Validators.min(MIN_YEAR),
        Validators.max(MAX_YEAR),
      ]),
    },
    { validators: yearSpanValidator }
  );

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

  toggleYearTo() {
    if (this.isCurrentlyStudying) {
      this.yearTo.disable();
      this.yearTo.reset();
    } else {
      this.yearTo.enable();
      this.yearTo.setValue(MAX_YEAR);
    }
  }

  writeValue(education: Education): void {
    if (education) {
      this.educationGroup.setValue({
        school: education.school,
        degree: education.degree ?? '',
        grade: education.grade ?? 0,
        yearFrom: education.yearFrom,
        yearTo: education.yearTo ?? education.yearFrom,
      });

      this.isCurrentlyStudying = !education.yearTo;
      this.toggleYearTo();
    }
  }

  registerOnChange(onChange: any): void {
    this.onChangeSub = this.educationGroup.valueChanges.subscribe(onChange);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let error: { [key: string]: any } | null = this.educationGroup.errors;

    if (!error && this.educationGroup.invalid) {
      error = { [EMPTY_ERROR_KEY]: true };
    }

    // Object.keys(this.educationGroup.controls).forEach((key) => {
    //   const err = this.educationGroup.get(key)?.errors;
    //   if (err) console.log(err);
    // });
    // console.log(this.index, error);

    return error;
  }

  get school() {
    return this.educationGroup.get('school')!;
  }

  get degree() {
    return this.educationGroup.get('degree')!;
  }

  get grade() {
    return this.educationGroup.get('grade')!;
  }

  get yearFrom() {
    return this.educationGroup.get('yearFrom')!;
  }

  get yearTo() {
    return this.educationGroup.get('yearTo')!;
  }
}
