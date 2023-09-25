import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { EditPersonComponent } from 'src/app/components/edit-person/edit-person.component';
import { Education, Person, User, WorkExperience, ListItem, PersonUpdateDto, FileSelectEvent } from 'src/app/models';
import { DIALOG_DEFAULT } from 'src/app/shared/constants';
import { UserType } from 'src/app/shared/enums';
import { filterNull, getUserImageUrl, getUserType, isSameUser } from 'src/app/shared/helpers';
import { selectUserAndPerson } from 'src/app/state/app.selectors';
import { AppState } from 'src/app/state/app.state';
import { fromAuth } from 'src/app/state/auth';
import { fromPersons, personsActions } from 'src/app/state/persons';
import { fromUser, userActions } from 'src/app/state/user';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  users$ = this.store.select(selectUserAndPerson).pipe(filterNull());
  dialogRef?: DynamicDialogRef;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.store.dispatch(personsActions.loadPerson({ personId: params['id'] }));
    });
  }

  ngOnDestroy(): void {
    if (this.dialogRef) this.dialogRef.destroy();
  }

  openEditPersonDialog(person: Person) {
    this.dialogRef = this.dialogService.open(EditPersonComponent, {
      ...DIALOG_DEFAULT,
      header: 'Edit profile',
      data: { person },
      dismissableMask: true,
    });

    this.dialogRef.onClose.pipe(filterNull()).subscribe((updatedPerson: PersonUpdateDto) => {
      this.updatePerson(person._id, updatedPerson);
    });
  }

  updatePerson(personId: string, updatedPerson: PersonUpdateDto) {
    console.log('From dialog: ', updatedPerson);
    this.store.dispatch(userActions.updatePerson({ id: personId, payload: updatedPerson }));
  }

  deletePerson(person: Person) {
    this.confirmationService.confirm({
      header: 'Delete account confirmation',
      message: 'Are you sure you want to delete your account? This action cannot be reversed.',
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      acceptButtonStyleClass: 'p-button-danger',
      key: 'deletePersonDialog',
      accept: () => {
        this.store.dispatch(userActions.deletePerson({ id: person._id }));
      },
    });
  }

  getPersonPosition(person: Person): string {
    const positions: string[] = [];

    for (let job of person.prevExperience) {
      if (!job.yearTo) {
        positions.push(`${job.position} at ${job.companyName}`);
      }
    }
    for (let education of person.education) {
      if (!education.yearTo) {
        positions.push(`Student at ${education.school}`);
      }
    }

    return positions.length ? positions.join(' / ') : 'Job Board user';
  }

  formatPeriod(yearFrom: number, yearTo?: number): string {
    return `${yearFrom} - ${yearTo ?? 'Present'}`;
  }

  isPersonLoggedInUser(person: Person, loggedInUser: User): boolean {
    return isSameUser(person, loggedInUser);
  }

  getNoAttributeMessage(person: Person, loggedInUser: User, attribute: string) {
    const [user, pronoun] = this.isPersonLoggedInUser(person, loggedInUser)
      ? ['You have', 'your']
      : ['User has', 'their'];
    return `${user} not provided any information about ${pronoun} ${attribute}.`;
  }

  getPersonLocation(person: Person): string {
    const personLocation = person.location;

    let result = '';
    if (personLocation) {
      result = personLocation.city ? `${personLocation.city}, ${personLocation.country}` : personLocation.country;
    }
    return result;
  }

  getJobListDetails(job: WorkExperience): ListItem[] {
    return [
      { label: 'Position', value: job.position },
      { label: 'Description', value: job.description },
      { label: 'Period employed', value: this.formatPeriod(job.yearFrom, job.yearTo) },
    ];
  }

  getEducationListDetails(education: Education): ListItem[] {
    return [
      { label: 'Degree', value: education.degree },
      { label: 'Grade', value: education.grade },
      { label: 'Academic period', value: this.formatPeriod(education.yearFrom, education.yearTo) },
    ];
  }

  getImageUrl(person: Person): string {
    return getUserImageUrl(person);
  }
}
