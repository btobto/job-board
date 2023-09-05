import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, from, map, take, takeUntil, tap } from 'rxjs';
import { AppState } from '../state/app.state';
import { fromAuth } from '../state/auth';

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return combineLatest([
      this.store.select(fromAuth.selectIsLoggedIn),
      this.store.select(fromAuth.selectLoading),
    ]).pipe(
      filter(([_, isLoading]) => !isLoading),
      take(1),
      tap(([isAuthenticated, _]) => {
        if (isAuthenticated) {
          this.router.navigate(['/']);
        }
      }),
      map(([isAuthenticated, _]) => !isAuthenticated)
    );
  }
}
