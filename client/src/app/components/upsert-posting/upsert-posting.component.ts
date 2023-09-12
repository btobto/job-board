import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Location, Posting, PostingDto } from 'src/app/models';
import { getLocationString, removeEmptyValuesFromObject } from 'src/app/shared/helpers';

@Component({
  selector: 'app-upsert-posting',
  templateUrl: './upsert-posting.component.html',
  styleUrls: ['./upsert-posting.component.scss'],
})
export class UpsertPostingComponent {
  locations: Record<string, Location> = {};
  posting: PostingDto = {
    position: '',
    description: '',
    remoteAvailable: false,
    salary: '',
    requirements: [],
  };

  createForm: FormGroup;

  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private fb: NonNullableFormBuilder
  ) {
    if (this.dialogConfig.data.locations) {
      this.locations = Object.fromEntries(
        this.dialogConfig.data.locations.map((location: Location) => [getLocationString(location), location])
      );
    }

    if (this.dialogConfig.data.posting) {
      this.posting = this.dialogConfig.data.posting;
    }

    this.createForm = this.fb.group({
      position: [this.posting.position, Validators.required],
      location: [
        {
          value: this.posting.location ? getLocationString(this.posting.location) : '',
          disabled: !this.locationsValues.length,
        },
      ],
      description: [this.posting.description],
      remoteAvailable: [this.posting.remoteAvailable, Validators.required],
      salary: [this.posting.salary],
      requirements: this.fb.control<string[]>(this.posting.requirements),
    });
  }

  create() {
    const rawValue = this.createForm.getRawValue();
    const formValue = removeEmptyValuesFromObject({
      ...rawValue,
      location: !!rawValue.location ? this.locations[rawValue.location] : '',
    });
    this.dialogRef.close(formValue);
  }

  cancel() {
    this.dialogRef.close();
  }

  get locationsValues(): string[] {
    return Object.keys(this.locations);
  }

  get position() {
    return this.createForm.get('position')!;
  }

  get location() {
    return this.createForm.get('location')!;
  }
  get description() {
    return this.createForm.get('description')!;
  }

  get remoteAvailable() {
    return this.createForm.get('remoteAvailable')!;
  }

  get salary() {
    return this.createForm.get('salary')!;
  }

  get requirements() {
    return this.createForm.get('requirements')!;
  }
}
