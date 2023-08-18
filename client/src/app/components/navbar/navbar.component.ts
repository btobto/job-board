import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { AppState } from 'src/app/state/app.state';
import { authActions } from 'src/app/state/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure you want to log out?',
      icon: 'pi pi-exclamation-triangle',
      key: 'logoutDialog',
      accept: () => {
        this.store.dispatch(authActions.logout());
      },
    });
  }
}
