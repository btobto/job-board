import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { EditPersonComponent } from 'src/app/components/edit-person/edit-person.component';
import { Education, Person, User, WorkExperience, ListItem } from 'src/app/models';
import { UserType } from 'src/app/shared/enums/user-type.enum';
import { getUserType, isNotNull } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { fromAuth } from 'src/app/state/auth';
import { fromPerson, personActions } from 'src/app/state/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit, OnDestroy {
  loggedInUser$: Observable<User> = this.store.select(fromAuth.selectUser).pipe(filter(isNotNull));
  selectedPerson$: Observable<Person> = this.store.select(fromPerson.selectSelectedPerson).pipe(filter(isNotNull));
  users$ = combineLatest([this.selectedPerson$, this.loggedInUser$]).pipe(
    map(([person, loggedInUser]) => ({ person, loggedInUser }))
  );

  dialogRef: DynamicDialogRef | undefined;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.store.dispatch(personActions.loadPerson({ personId: params['id'] }));
    });
  }

  ngOnDestroy(): void {
    if (this.dialogRef) this.dialogRef.destroy();
  }

  openEditPersonDialog(person: Person) {
    this.dialogRef = this.dialogService.open(EditPersonComponent, {
      header: 'Edit profile',
      dismissableMask: true,
      data: { person },
    });

    // this.dialogRef.onClose.subscribe((person: Person) => {
    //   console.log('From dialog: ', person);
    // });
  }

  getPersonPosition(person: Person): string {
    const positions: string[] = [];

    for (let job of person.prevExperience) {
      if (job.yearTo) {
        positions.push(`${job.position} @ ${job.companyName}`);
      }
    }
    for (let education of person.education) {
      if (education.yearTo) {
        positions.push(`Student @ ${education.school}`);
      }
    }

    return positions.length ? positions.join(' / ') : 'Job Board user';
  }

  formatPeriod(yearFrom: number, yearTo?: number): string {
    return `${yearFrom} - ${yearTo ?? 'Present'}`;
  }

  isPersonLoggedInUser(person: Person, loggedInUser: User): boolean {
    return getUserType(loggedInUser) === UserType.Person && person._id === loggedInUser._id;
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
}
