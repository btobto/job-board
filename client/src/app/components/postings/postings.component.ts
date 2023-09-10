import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Company, Location, User } from 'src/app/models';
import { getLocationString, isSameUser } from 'src/app/shared/helpers';
import { selectUserAndCompany } from 'src/app/state/app.selectors';
import { AppState } from 'src/app/state/app.state';
import { fromPostings } from 'src/app/state/postings';
import { fromUser } from 'src/app/state/user';
import { CreatePostingComponent } from '../create-posting/create-posting.component';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.scss'],
})
export class PostingsComponent implements OnDestroy {
  postings$ = this.store.select(fromPostings.selectAllPostings);
  users$ = this.store.select(selectUserAndCompany);

  dialogRef?: DynamicDialogRef;

  constructor(private store: Store<AppState>, public dialogService: DialogService) {}

  ngOnDestroy(): void {
    if (this.dialogRef) this.dialogRef.destroy();
  }

  newPosting(locations: Location[]) {
    this.dialogRef = this.dialogService.open(CreatePostingComponent, {
      header: 'New posting',
      dismissableMask: true,
      data: { locations: locations.map(getLocationString) },
      styleClass: 'sm:w-full xl:w-5',
      contentStyle: {
        'padding-bottom': '70px',
      },
    });

    this.dialogRef.onClose.subscribe((posting) => {
      console.log(posting);
    });
  }

  isLoggedInUser(company: Company, user: User) {
    return isSameUser(company, user);
  }
}
