import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import { authActions } from '.';
import { catchError, delay, exhaustMap, map, of, tap } from 'rxjs';
import { User, UserLogin } from 'src/app/models';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      //   delay(2000),
      exhaustMap(({ payload }) =>
        this.authService.login(payload).pipe(
          map((user: User) => authActions.loginSuccess({ user })),
          catchError((error) => of(authActions.loginFailure({ error })))
        )
      )
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess, authActions.registerSuccess),
        tap(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );

  // dialog
  //   logoutInit$ = createEffect(() =>
  // 		this.actions$.pipe(
  // 			ofType(authActions.logoutInit),
  // 			exhaustMap(() => {

  // 			})
  // 		)
  //   )

  logoutConfirmed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logoutConfirmed),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
