import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import { authActions } from '.';
import { catchError, exhaustMap, filter, map, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { LocalStorageJwtService } from 'src/app/services/local-storage-jwt.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      // delay(2000),
      exhaustMap(({ payload, isCompany }) =>
        this.authService.login(payload, isCompany).pipe(
          tap((user) => console.log('login dispatched', user)),
          map((user: User) => authActions.loginSuccess({ user })),
          catchError((error) => of(authActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.registerPerson, authActions.registerCompany),
      exhaustMap(({ payload }) =>
        this.authService.register(payload).pipe(
          map((user: User) => authActions.registerSuccess({ user })),
          catchError((error) => of(authActions.registerFailure({ error })))
        )
      )
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.autoLogin),
      switchMap(({ token }) =>
        this.authService.getUser().pipe(
          tap(() => console.log('autologin')),
          map((user) => authActions.autoLoginSuccess({ user: { ...user, accessToken: token } })),
          catchError(() => of(authActions.autoLoginFaliure()))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          this.localStorageJwtService.removeToken();
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess, authActions.registerSuccess),
        tap(({ user }) => {
          this.localStorageJwtService.setToken(user.accessToken);
          this.router.navigate(['/']);
          console.log('Auth success: ', user);
        })
      ),
    { dispatch: false }
  );

  authFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginFailure, authActions.registerFailure),
        tap(({ error }) => this.notificationService.showMessage('error', 'Error', error.message))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageJwtService: LocalStorageJwtService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
