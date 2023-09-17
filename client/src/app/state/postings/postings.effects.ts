import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postingsActions } from './';
import { catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { PostingService } from 'src/app/services/posting.service';
import { NotificationService } from 'src/app/services/notification.service';

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

  createPosting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postingsActions.createPosting),
      concatMap(({ dto }) =>
        this.postingService.createPosting(dto).pipe(
          map((posting) => postingsActions.createPostingSuccess({ posting })),
          catchError(({ error }) => of(postingsActions.postingFailure({ error })))
        )
      )
    )
  );

  updatePosting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postingsActions.updatePosting),
      concatMap(({ postingId, dto }) =>
        this.postingService.updatePosting(postingId, dto).pipe(
          map((posting) => postingsActions.updatePostingSuccess({ posting })),
          catchError(({ error }) => of(postingsActions.postingFailure({ error })))
        )
      )
    )
  );

  toggleApplyPosting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postingsActions.toggleApplyPosting),
      concatMap(({ postingId }) =>
        this.postingService.toggleApply(postingId).pipe(
          map((posting) => postingsActions.toggleApplyPostingSuccess({ posting })),
          catchError(({ error }) => of(postingsActions.postingFailure({ error })))
        )
      )
    )
  );

  deletePosting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postingsActions.deletePosting),
      concatMap(({ id }) =>
        this.postingService.deletePosting(id).pipe(
          map(() => postingsActions.deletePostingSuccess({ id })),
          catchError(({ error }) => of(postingsActions.postingFailure({ error })))
        )
      )
    )
  );

  changePostingSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          postingsActions.createPostingSuccess,
          postingsActions.updatePostingSuccess,
          postingsActions.deletePostingSuccess,
          postingsActions.toggleApplyPostingSuccess
        ),
        tap((action) => {
          this.notificationService.showMessage('success', 'Success', this.actionTypeToMessage[action.type]);
        })
      ),
    { dispatch: false }
  );

  loadApplicants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postingsActions.loadPostingApplicants),
      switchMap(({ postingId }) =>
        this.postingService.getApplicants(postingId).pipe(
          map((applicants) => postingsActions.loadPostingApplicantsSuccess({ applicants })),
          catchError(({ error }) => of(postingsActions.loadPostingApplicantsFailure({ error })))
        )
      )
    )
  );

  postingFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(postingsActions.postingFailure),
        tap(({ error }) => {
          this.notificationService.showMessage('error', 'Error', 'An error occured.');
        })
      ),
    { dispatch: false }
  );

  actionTypeToMessage = {
    [postingsActions.createPostingSuccess.type]: 'Posting created successfully!',
    [postingsActions.updatePostingSuccess.type]: 'Posting updated successfully!',
    [postingsActions.deletePostingSuccess.type]: 'Posting deleted successfully!',
    [postingsActions.toggleApplyPostingSuccess.type]: 'Application status successfully changed!',
  };

  constructor(
    private actions$: Actions,
    private postingService: PostingService,
    private notificationService: NotificationService
  ) {}
}
