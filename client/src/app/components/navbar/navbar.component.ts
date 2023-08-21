import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { AppState } from 'src/app/state/app.state';
import { authActions } from 'src/app/state/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private store: Store<AppState>, private confirmationService: ConfirmationService) {}

  items: MenuItem[] = [];

  ngOnInit(): void {
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
            label: 'Settings',
            icon: PrimeIcons.COG,
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
