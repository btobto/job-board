import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, map, take, takeUntil, tap } from 'rxjs';
import { AppState } from '../state/app.state';
import { fromAuth } from '../state/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return combineLatest([
      this.store.select(fromAuth.selectIsLoggedIn),
      this.store.select(fromAuth.selectLoading),
    ]).pipe(
      filter(([_, isLoading]) => !isLoading),
      take(1),
      map(([isAuthenticated, _]) => isAuthenticated),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }
}
