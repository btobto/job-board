import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { Education, FileSelectEvent, Person, WorkExperience } from 'src/app/models';
import { MAX_YEAR, MIN_YEAR, NAME_MAX_LENGTH, NAME_MIN_LENGTH } from 'src/app/shared/constants';
import { locationValidator, yearSpanValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss'],
})
export class EditPersonComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  selectedFile: File | null = null;
  imageSource: string | null = null;
  person!: Person;
  editForm!: FormGroup;

  constructor(
    public dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.person = this.dialogConfig.data.person;
    console.log(this.person);
    this.imageSource = this.person.imagePath ?? './assets/images/user-default-icon.png';

    this.editForm = this.fb.group({
      name: [
        this.person.name,
        [Validators.required, Validators.minLength(NAME_MIN_LENGTH), Validators.maxLength(NAME_MAX_LENGTH)],
      ],
      about: [this.person.about, [Validators.maxLength(500)]],
      // location: this.fb.group(
      //   {
      //     country: [this.person.location?.country],
      //     city: [this.person.location?.city],
      //   },
      //   { validators: locationValidator }
      // ),
      location: [this.person.location],
      skills: this.fb.control<string[]>(this.person.skills),
      prevExperience: this.fb.array([
        this.person.prevExperience.map(
          (job) => this.createWorkExperienceGroup(job)
          // this.fb.group({
          //   companyName: [job.companyName, [Validators.required]],
          //   position: [job.position, [Validators.required]],
          //   skills: this.fb.control(job.skills),
          //   yearFrom: [job.yearFrom, [Validators.required, Validators.min(MIN_YEAR), Validators.max(MAX_YEAR)]],
          //   yearTo: [job.yearTo, [Validators.min(MIN_YEAR), Validators.max(MAX_YEAR)]],
          // })
        ),
      ]),
      education: this.fb.array([
        this.person.education.map(
          (education) => this.createEducationGroup(education)
          // this.fb.group({
          //   school: [education.school, [Validators.required]],
          //   degree: [education.degree],
          //   grade: [education.grade],
          //   yearFrom: [education.yearFrom, [Validators.required, Validators.min(MIN_YEAR), Validators.max(MAX_YEAR)]],
          //   yearTo: [education.yearTo, [Validators.min(MIN_YEAR), Validators.max(MAX_YEAR)]],
          // })
        ),
      ]),
    });

    console.log(this.editForm.getRawValue());
  }

  onImageSelected(event: FileSelectEvent) {
    console.log(event);
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

  saveChanges() {
    const formValue = this.editForm.getRawValue();
    console.log(formValue);

    const value = this.editForm.value;
    console.log(value);
  }

  addWorkExperience() {
    this.prevExperience.push(this.createWorkExperienceGroup());
  }

  addEducation() {
    this.education.push(this.createEducationGroup);
  }

  createWorkExperienceGroup(job: WorkExperience | null = null) {
    return this.fb.group(
      {
        companyName: [job?.companyName, Validators.required],
        position: [job?.position, Validators.required],
        description: [job?.description],
        skills: this.fb.control<string[]>(job?.skills || []),
        yearFrom: [job?.yearFrom, [Validators.required, Validators.min(MIN_YEAR), Validators.max(MAX_YEAR)]],
        yearTo: [job?.yearTo, [Validators.min(MIN_YEAR), Validators.max(MAX_YEAR)]],
      },
      { validators: yearSpanValidator }
    );
  }

  createEducationGroup(education: Education | null = null) {
    return this.fb.group(
      {
        school: [education?.school, [Validators.required]],
        degree: [education?.degree],
        grade: [education?.grade],
        yearFrom: [education?.yearFrom, [Validators.required, Validators.min(MIN_YEAR), Validators.max(MAX_YEAR)]],
        yearTo: [education?.yearTo, [Validators.min(MIN_YEAR), Validators.max(MAX_YEAR)]],
      },
      { validators: yearSpanValidator }
    );
  }

  get name() {
    return this.editForm.get('name')!;
  }

  get about() {
    return this.editForm.get('about')!;
  }

  get location() {
    return this.editForm.get('location')!;
  }

  get skills() {
    return this.editForm.get('skills')!;
  }

  get prevExperience() {
    return this.editForm.get('prevExperience')! as FormArray;
  }

  get education() {
    return this.editForm.get('education')! as FormArray;
  }
}
