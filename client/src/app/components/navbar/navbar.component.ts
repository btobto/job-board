import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models';
import { getUserType } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { authActions, fromAuth } from 'src/app/state/auth';
import { fromUser } from 'src/app/state/user';

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user!: User;
  items: MenuItem[] = [];

  constructor(private store: Store<AppState>, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.store
      .select(fromUser.selectUser)
      .pipe(untilDestroyed(this))
      .subscribe((user) => (this.user = user!));

    this.items = [
      {
        label: 'Search',
        icon: PrimeIcons.SEARCH,
        routerLink: ['/search'],
      },
      {
        label: 'Account',
        icon: PrimeIcons.USER,
        items: [
          {
            label: 'View profile',
            icon: PrimeIcons.USER_EDIT,
            routerLink: [`/${getUserType(this.user)}`, this.user._id],
          },
          {
            label: 'Logout',
            icon: PrimeIcons.SIGN_OUT,
            command: () => this.logout(),
          },
        ],
      },
    ];
  }

  logout() {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure you want to log out?',
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      key: 'logoutDialog',
      accept: () => {
        this.store.dispatch(authActions.logout());
      },
    });
  }
}
