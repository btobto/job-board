import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postingsActions } from '.';
import { catchError, map, of, switchMap } from 'rxjs';
import { PostingService } from 'src/app/services/posting.service';

@Injectable()
export class PostingsEffects {
  loadCompanyPostings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postingsActions.loadCompanyPostings),
      switchMap(({ companyId }) =>
        this.postingService.getCompanyPostings(companyId).pipe(
          map((postings) => postingsActions.loadCompanyPostingsSuccess({ postings })),
          catchError(({ error }) => of(postingsActions.postingFailure({ error })))
        )
      )
    )
  );

  loadPosting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postingsActions.loadPosting),
      switchMap(({ id }) =>
        this.postingService.getPosting(id).pipe(
          map((posting) => postingsActions.loadPostingSuccess({ posting })),
          catchError(({ error }) => of(postingsActions.postingFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private postingService: PostingService) {}
}
