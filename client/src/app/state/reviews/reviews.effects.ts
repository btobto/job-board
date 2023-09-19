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
import { fromCompanies } from '../companies';
import { filterNull } from 'src/app/shared/helpers';
import { REVIEW_TAKE_LIMIT } from 'src/app/shared/constants';
import { fromPagination, paginationActions } from '../pagination';

@Injectable()
export class ReviewsEffects {
  loadCompanyReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.loadCompanyReviews),
      concatLatestFrom(() => this.store.select(fromPagination.selectPages)),
      switchMap(([{ companyId, query }, pages]) => {
        if (pages.includes(query.page)) {
          return of(paginationActions.changeCurrentPage({ newPage: query.page }));
        } else {
          return this.reviewService.getCompanyReviews(companyId, query).pipe(
            map((result: PaginationResult<Review>) => reviewsActions.loadCompanyReviewsSuccess({ result })),
            catchError((error) => of(reviewsActions.reviewFailure({ error })))
          );
        }
      })
    )
  );

  loadUserReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.loadPersonReview),
      switchMap(({ companyId }) =>
        this.reviewService.getUserReviewForCompany(companyId).pipe(
          map((review) => reviewsActions.loadPersonReviewSuccess({ review })),
          catchError((error) => of(reviewsActions.reviewFailure({ error })))
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
          catchError((error) => of(reviewsActions.reviewFailure({ error })))
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
          catchError((error) => of(reviewsActions.reviewFailure({ error })))
        )
      )
    )
  );

  deleteReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.deleteReview),
      concatMap(({ id }) =>
        this.reviewService.deleteReview(id).pipe(
          map(() => reviewsActions.deleteReviewSuccess()),
          catchError((error) => of(reviewsActions.reviewFailure({ error })))
        )
      )
    )
  );

  orderChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.createReviewSuccess, reviewsActions.deleteReviewSuccess),
      concatLatestFrom(() => [
        this.store.select(fromCompanies.selectSelectedCompany).pipe(filterNull()),
        this.store.select(fromPagination.selectPaginationInfo),
      ]),
      map(([_, company, pagination]) =>
        reviewsActions.refreshPage({
          companyId: company._id,
          query: {
            page: pagination.currentPage,
            take: REVIEW_TAKE_LIMIT,
          },
        })
      )
    )
  );

  refreshPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.refreshPage),
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
  };

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private reviewService: ReviewService,
    private notificationService: NotificationService
  ) {}
}
