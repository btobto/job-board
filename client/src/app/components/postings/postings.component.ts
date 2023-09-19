import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Company, Location, Posting, PostingDto, User } from 'src/app/models';
import { filterNull, getLocationString, isSameUser } from 'src/app/shared/helpers';
import { selectUserAndCompany } from 'src/app/state/app.selectors';
import { AppState } from 'src/app/state/app.state';
import { fromPostings, postingsActions } from 'src/app/state/postings';
import { fromUser } from 'src/app/state/user';
import { UpsertPostingComponent } from '../upsert-posting/upsert-posting.component';
import { ActivatedRoute } from '@angular/router';
import { DIALOG_DEFAULT } from 'src/app/shared/constants';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.scss'],
})
export class PostingsComponent implements OnInit, OnDestroy {
  postings$ = this.store.select(fromPostings.selectAllPostings);
  users$ = this.store.select(selectUserAndCompany);

  dialogRef?: DynamicDialogRef;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.store.dispatch(postingsActions.loadCompanyPostings({ companyId: params['id'] }));
    });
  }

  ngOnDestroy(): void {
    if (this.dialogRef) this.dialogRef.destroy();
  }

  openCreatePostingDialog(locations: Location[]) {
    this.dialogRef = this.dialogService.open(UpsertPostingComponent, {
      ...DIALOG_DEFAULT,
      header: 'New posting',
      data: { locations },
    });

    this.dialogRef.onClose.pipe(filterNull()).subscribe((posting) => this.createPosting(posting));
  }

  createPosting(dto: PostingDto) {
    this.store.dispatch(postingsActions.createPosting({ dto }));
  }

  isLoggedInUser(company: Company, user: User) {
    return isSameUser(company, user);
  }
}
