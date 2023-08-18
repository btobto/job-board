import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  onSubmit() {
    this.store.dispatch(
      authActions.login({
        payload: {
          email: this.email,
          password: this.password,
        },
        isCompany: this.isCompany,
      })
    );
  }
}
