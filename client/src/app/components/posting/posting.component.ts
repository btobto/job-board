import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { Company, Location, Posting, User } from 'src/app/models';
import { UserType } from 'src/app/shared/enums';
import { getLocationString, getUserType } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { fromUser } from 'src/app/state/user';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss'],
})
export class PostingComponent implements OnInit {
  UserType = UserType;
  @Input() posting!: Posting;

  postingDetails: { icon: PrimeIcons; value?: string | null }[] = [];

  user$ = this.store.select(fromUser.selectUser);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postingDetails = [
      {
        icon: PrimeIcons.MONEY_BILL,
        value: this.posting.salary,
      },
      {
        icon: PrimeIcons.MAP_MARKER,
        value: this.posting.location ? getLocationString(this.posting.location) : null,
      },
      {
        icon: PrimeIcons.GLOBE,
        value: this.posting.remoteAvailable ? 'Remote available' : null,
      },
    ];
  }

  getPostingLocationString(location: Location) {
    return getLocationString(location);
  }
}
