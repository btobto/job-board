import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Person } from 'src/app/models';
import { getLocationString, getUserImageUrl } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { fromPersons } from 'src/app/state/persons';
import { postingsActions } from 'src/app/state/postings';

@Component({
  selector: 'app-applicants-dialog',
  templateUrl: './applicants-dialog.component.html',
  styleUrls: ['./applicants-dialog.component.scss'],
})
export class ApplicantsDialogComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig
  ) {}

  applicants$ = this.store.select(fromPersons.selectAllPersons);

  ngOnInit(): void {
    const postingId = this.dialogConfig.data.postingId;
    this.store.dispatch(postingsActions.loadPostingApplicants({ postingId }));
  }

  getLocation(person: Person) {
    return person.location ? getLocationString(person.location) : 'Not provided.';
  }

  getImageUrl(person: Person) {
    return getUserImageUrl(person);
  }
}
