import { Component, ViewChild } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { Company, FileSelectEvent, Location } from 'src/app/models';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, URL_REGEX } from 'src/app/shared/constants';
import { getUserImageUrl, objectsAreEqual, removeEmptyValuesFromObject } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { userActions } from 'src/app/state/user';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  selectedFile: File | null = null;
  imageSource: string;
  editForm: FormGroup;
  initialFormValue: any;

  company: Company;

  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private fb: NonNullableFormBuilder,
    private store: Store<AppState>
  ) {
    this.company = this.dialogConfig.data.company;
    this.imageSource = getUserImageUrl(this.company);

    this.editForm = this.fb.group({
      name: [
        this.company.name,
        [Validators.required, Validators.minLength(NAME_MIN_LENGTH), Validators.maxLength(NAME_MAX_LENGTH)],
      ],
      website: [this.company.website, [Validators.required, Validators.pattern(URL_REGEX)]],
      about: [this.company.about],
      locations: this.fb.array(this.company.locations),
    });

    this.initialFormValue = removeEmptyValuesFromObject(this.editForm.getRawValue());
  }

  onImageSelected(event: FileSelectEvent) {
    this.selectedFile = event.currentFiles[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSource = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }

    this.fileUpload.clear();
  }

  uploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.store.dispatch(userActions.uploadCompanyImage({ companyId: this.company._id, formData }));
  }

  saveChanges() {
    const formValue = removeEmptyValuesFromObject(this.editForm.getRawValue());
    const sendValue = objectsAreEqual(this.initialFormValue, formValue) ? null : formValue;
    this.dialogRef.close(sendValue);
  }

  cancel() {
    this.dialogRef.close();
  }

  addLocation() {
    this.locations.push(this.createLocationGroup());
  }

  deleteLocation(index: number) {
    this.locations.removeAt(index);
  }

  createLocationGroup() {
    return this.fb.control<Location>({
      country: '',
      city: '',
      address: '',
    });
  }

  get name() {
    return this.editForm.get('name')!;
  }

  get website() {
    return this.editForm.get('website')!;
  }

  get about() {
    return this.editForm.get('about')!;
  }

  get locations() {
    return this.editForm.get('locations')! as FormArray;
  }
}
