import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { authActions, fromAuth } from 'src/app/state/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    payload: new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(25),
        ],
      }),
    }),
    isCompany: new FormControl(false, { nonNullable: true }),
  });

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('payload.email')!;
  }

  get password() {
    return this.loginForm.get('payload.password')!;
  }

  onSubmit() {
    this.store.dispatch(
      authActions.login({
        payload: this.loginForm.getRawValue().payload,
        isCompany: this.loginForm.getRawValue().isCompany,
      })
    );
  }
}
