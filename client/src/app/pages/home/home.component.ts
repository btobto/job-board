import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, filter, take } from 'rxjs';
import { Company, PostingPopulated, User } from 'src/app/models';
import { UserType } from 'src/app/shared/enums';
import { filterNull, getUserType } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { fromAuth } from 'src/app/state/auth';
import { companiesActions, fromCompanies } from 'src/app/state/companies';
import { fromPostings, postingsActions } from 'src/app/state/postings';
import { fromUser } from 'src/app/state/user';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  UserType = UserType;

  user$ = this.store.select(fromUser.selectUser).pipe(filterNull());
  postings$ = this.store.select(fromPostings.selectPostingsIfLoaded) as Observable<PostingPopulated[]>;
  companies$ = this.store.select(fromCompanies.selectAllCompanies);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(fromUser.selectUserType)
      .pipe(filterNull(), untilDestroyed(this))
      .subscribe((type) => {
        if (type === UserType.Person) {
          this.store.dispatch(postingsActions.getRecommendedPostings());
        }
      });

    this.store.dispatch(companiesActions.getHighestRatedCompanies());
  }

  getUserType(user: User): UserType {
    return getUserType(user);
  }
}
