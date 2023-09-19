import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { ReviewService } from 'src/app/services/review.service';
import * as reviewsActions from './reviews.actions';
import { PaginationResult } from 'src/app/models/pagination/pagination-result.model';
import { Review } from 'src/app/models';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { fromReviews } from '.';
import { fromCompanies } from '../companies';
import { filterNull } from 'src/app/shared/helpers';
import { REVIEW_TAKE_LIMIT } from 'src/app/shared/constants';

@Injectable()
export class ReviewsEffects {
  loadCompanyReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.loadCompanyReviews),
      switchMap(({ companyId, query }) =>
        this.reviewService.getCompanyReviews(companyId, query).pipe(
          map((result: PaginationResult<Review>) => reviewsActions.loadCompanyReviewsSuccess({ result })),
          catchError(({ error }) => of(reviewsActions.reviewFailure({ error })))
        )
      )
    )
  );

  loadUserReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.loadPersonReview),
      switchMap(({ companyId }) =>
        this.reviewService.getUserReviewForCompany(companyId).pipe(
          map((review) => reviewsActions.loadPersonReviewSuccess({ review })),
          catchError(({ error }) => of(reviewsActions.reviewFailure({ error })))
        )
      )
    )
  );

  postReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.createReview),
      concatMap(({ companyId, dto }) =>
        this.reviewService.postReview(companyId, dto).pipe(
          map((review) => reviewsActions.createReviewSuccess({ review })),
          catchError(({ error }) => of(reviewsActions.reviewFailure({ error })))
        )
      )
    )
  );

  updateReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.updateReview),
      concatMap(({ reviewId, dto }) =>
        this.reviewService.updateReview(reviewId, dto).pipe(
          map((review) => reviewsActions.updateReviewSuccess({ review })),
          catchError(({ error }) => of(reviewsActions.reviewFailure({ error })))
        )
      )
    )
  );

  deleteReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.deleteReview),
      concatLatestFrom(() => [
        this.store.select(fromReviews.selectReviewsIds),
        this.store.select(fromReviews.selectPaginationInfo),
        this.store.select(fromCompanies.selectSelectedCompany).pipe(filterNull()),
      ]),
      mergeMap(([{ id }, ids, pagination, company]) =>
        this.reviewService.deleteReview(id).pipe(
          map(() =>
            ids.includes(id)
              ? reviewsActions.deleteReviewSuccessRefresh({
                  companyId: company._id,
                  query: { page: pagination.page, take: REVIEW_TAKE_LIMIT },
                })
              : reviewsActions.deleteReviewSuccess()
          ),
          catchError(({ error }) => of(reviewsActions.reviewFailure({ error })))
        )
      )
    )
  );

  deleteReviewSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.deleteReviewSuccessRefresh),
      map(({ companyId, query }) => reviewsActions.loadCompanyReviews({ companyId, query }))
    )
  );

  changeReviewSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          reviewsActions.createReviewSuccess,
          reviewsActions.updateReviewSuccess,
          reviewsActions.deleteReviewSuccess
        ),
        tap((action) => {
          this.notificationService.showMessage('success', 'Success', this.actionTypeToMessage[action.type]);
        })
      ),
    { dispatch: false }
  );

  actionTypeToMessage = {
    [reviewsActions.createReviewSuccess.type]: 'Review posted successfully!',
    [reviewsActions.updateReviewSuccess.type]: 'Review updated successfully!',
    [reviewsActions.deleteReviewSuccess.type]: 'Review deleted successfully!',
    [reviewsActions.deleteReviewSuccessRefresh.type]: 'Review deleted successfully!',
  };

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private reviewService: ReviewService,
    private notificationService: NotificationService
  ) {}
}
