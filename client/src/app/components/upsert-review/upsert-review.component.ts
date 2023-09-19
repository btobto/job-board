import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReviewDto } from 'src/app/models/review/review-dto.model';
import { removeEmptyValuesFromObject } from 'src/app/shared/helpers';

@Component({
  selector: 'app-upsert-review',
  templateUrl: './upsert-review.component.html',
  styleUrls: ['./upsert-review.component.scss'],
})
export class UpsertReviewComponent {
  review: ReviewDto = {
    rating: 0,
    description: '',
  };

  form: FormGroup;

  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private fb: NonNullableFormBuilder
  ) {
    if (this.dialogConfig.data?.review) {
      this.review = this.dialogConfig.data.review;
    }

    this.form = this.fb.group({
      rating: [this.review.rating, [Validators.required, Validators.min(1), Validators.max(5)]],
      description: [this.review.description],
    });
  }

  onSubmit() {
    const formValue = removeEmptyValuesFromObject(this.form.getRawValue());
    this.dialogRef.close(formValue);
  }

  cancel() {
    this.dialogRef.close();
  }

  get rating() {
    return this.form.get('rating')!;
  }

  get description() {
    return this.form.get('description')!;
  }
}
