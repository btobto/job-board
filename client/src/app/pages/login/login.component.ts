import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'src/app/shared/constants';
import { AppState } from 'src/app/state/app.state';
import { authActions, fromAuth } from 'src/app/state/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    payload: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
      ],
    }),
    isCompany: [false, Validators.required],
  });

  constructor(private store: Store<AppState>, private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    const formValue = this.loginForm.getRawValue();

    console.log(formValue);

    this.store.dispatch(
      authActions.login({
        payload: formValue.payload,
        isCompany: formValue.isCompany,
      })
    );
  }

  get email() {
    return this.loginForm.get('payload.email')!;
  }

  get password() {
    return this.loginForm.get('payload.password')!;
  }
}
