import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { companiesActions, fromCompanies } from '.';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorBody } from 'src/app/models';
import { reviewsActions } from '../reviews';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { filterNull } from 'src/app/shared/helpers';

@Injectable()
export class CompaniesEffects {
  loadCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companiesActions.loadCompany),
      switchMap(({ companyId }) =>
        this.companyService.getCompany(companyId).pipe(
          map((company) => companiesActions.loadCompanySuccess({ company })),
          catchError((error) => of(companiesActions.loadCompanyFailure({ error: error.error })))
        )
      )
    )
  );

  loadPersonFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(companiesActions.loadCompanyFailure),
        tap(({ error }: { error: HttpErrorBody }) =>
          this.notificationService.showMessage('error', error.error, error.message)
        )
      ),
    { dispatch: false }
  );

  updateRating = createEffect(() =>
    this.actions$.pipe(
      ofType(
        reviewsActions.createReviewSuccess,
        reviewsActions.updateReviewSuccess,
        reviewsActions.deleteReviewSuccess
      ),
      concatLatestFrom(() => this.store.select(fromCompanies.selectSelectedCompany).pipe(filterNull())),
      exhaustMap(([_, company]) =>
        this.companyService
          .getRating(company._id)
          .pipe(map((rating) => companiesActions.updateRating({ changes: { id: company._id, changes: rating } })))
      )
    )
  );

  searchCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companiesActions.searchCompanies),
      switchMap(({ query }) =>
        this.companyService.search(query).pipe(
          tap(console.log),
          map((companies) => companiesActions.searchCompaniesSuccess({ companies })),
          catchError((error) => of(companiesActions.searchCompaniesFailure({ error })))
        )
      )
    )
  );

  getHighestRatedCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companiesActions.getHighestRatedCompanies),
      exhaustMap(() =>
        this.companyService.getHighestRated().pipe(
          tap(console.log),
          map((companies) => companiesActions.getHighestRatedCompaniesSuccess({ companies })),
          catchError((error) => of(companiesActions.getHighestRatedCompaniesFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private companyService: CompanyService,
    private notificationService: NotificationService
  ) {}
}
