import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { companiesActions } from '.';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorBody } from 'src/app/models';

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

  constructor(
    private actions$: Actions,
    private companyService: CompanyService,
    private notificationService: NotificationService
  ) {}
}
