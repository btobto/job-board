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
import { WorkExperience } from 'src/app/models';
import { EMPTY_ERROR_KEY, MAX_YEAR, MIN_YEAR } from 'src/app/shared/constants';
import { yearSpanValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-work-experience-form-group',
  templateUrl: './work-experience-form-group.component.html',
  styleUrls: ['./work-experience-form-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: WorkExperienceFormGroupComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: WorkExperienceFormGroupComponent,
    },
  ],
})
export class WorkExperienceFormGroupComponent implements ControlValueAccessor, Validator, OnDestroy {
  constructor(private fb: NonNullableFormBuilder) {}

  @Input() index = 0;

  minYear = MIN_YEAR;
  maxYear = MAX_YEAR;
  isCurrentJob = false;

  onTouched = () => {};
  onChangeSub!: Subscription;

  jobGroup = this.fb.group(
    {
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      description: [''],
      skills: this.fb.control<string[]>([]),
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
    if (this.isCurrentJob) {
      this.yearTo.disable();
      this.yearTo.reset();
    } else {
      this.yearTo.enable();
      this.yearTo.setValue(MAX_YEAR);
    }
  }

  writeValue(job: WorkExperience): void {
    if (job) {
      this.jobGroup.setValue({
        companyName: job.companyName,
        position: job.position,
        description: job.description ?? '',
        skills: job.skills || [],
        yearFrom: job.yearFrom,
        yearTo: job.yearTo ?? job.yearFrom,
      });

      this.isCurrentJob = !job.yearTo;
      this.toggleYearTo();
    }
  }

  registerOnChange(onChange: (value: any) => void): void {
    this.onChangeSub = this.jobGroup.valueChanges.subscribe(onChange);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let error: { [key: string]: any } | null = this.jobGroup.errors;

    if (!error && this.jobGroup.invalid) {
      error = { [EMPTY_ERROR_KEY]: true };
    }

    return error;
  }

  get companyName() {
    return this.jobGroup.get('companyName')!;
  }

  get position() {
    return this.jobGroup.get('position')!;
  }

  get description() {
    return this.jobGroup.get('description')!;
  }

  get skills() {
    return this.jobGroup.get('skills')!;
  }

  get yearFrom() {
    return this.jobGroup.get('yearFrom')!;
  }

  get yearTo() {
    return this.jobGroup.get('yearTo')!;
  }
}
