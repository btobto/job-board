import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PageEvent, Review } from 'src/app/models';
import { REVIEW_TAKE_LIMIT } from 'src/app/shared/constants';
import { UserType } from 'src/app/shared/enums';
import { selectUserAndCompany } from 'src/app/state/app.selectors';
import { AppState } from 'src/app/state/app.state';
import { fromReviews, reviewsActions } from 'src/app/state/reviews';
import { UpsertReviewComponent } from '../upsert-review/upsert-review.component';
import { filterNull } from 'src/app/shared/helpers';
import { ReviewDto } from 'src/app/models/review/review-dto.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnDestroy {
  UserType = UserType;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, public dialogService: DialogService) {}

  users$ = this.store.select(selectUserAndCompany);
  reviewsResults$ = this.store.select(fromReviews.selectReviewsWithPagination);
  userReview$ = this.store.select(fromReviews.selectUserReview);

  dialogRef?: DynamicDialogRef;

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      const companyId = params['id'];
      this.store.dispatch(
        reviewsActions.loadCompanyReviews({
          companyId,
          query: { page: 1, take: REVIEW_TAKE_LIMIT },
        })
      );
      this.store.dispatch(reviewsActions.loadPersonReview({ companyId }));
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(reviewsActions.clearReviews());
  }

  openCreateReviewDialog(companyId: string) {
    this.dialogRef = this.dialogService.open(UpsertReviewComponent, {
      header: 'Leave a review',
      dismissableMask: true,
      styleClass: 'sm:w-full xl:w-5',
    });

    this.dialogRef.onClose.pipe(filterNull()).subscribe((review: ReviewDto) => {
      this.store.dispatch(reviewsActions.createReview({ companyId, dto: review }));
    });
  }

  onPageChange(companyId: string, event: PageEvent) {
    this.store.dispatch(
      reviewsActions.loadCompanyReviews({ companyId, query: { page: event.page + 1, take: REVIEW_TAKE_LIMIT } })
    );
  }
}
