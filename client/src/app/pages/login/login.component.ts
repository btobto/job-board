import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs';
import { HttpErrorBody, UserLogin } from 'src/app/models';
import { AppState } from 'src/app/state/app.state';
import { authActions, fromAuth } from 'src/app/state/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  isCompany = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  login() {
    this.store.dispatch(
      authActions.login({
        payload: {
          email: this.email,
          password: this.password,
          isCompany: this.isCompany,
        },
      })
    );
  }
}
