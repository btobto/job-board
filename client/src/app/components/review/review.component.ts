import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Review } from 'src/app/models';
import { AppState } from 'src/app/state/app.state';
import { fromUser } from 'src/app/state/user';
import { UpsertReviewComponent } from '../upsert-review/upsert-review.component';
import { ReviewDto } from 'src/app/models/review/review-dto.model';
import { filterNull } from 'src/app/shared/helpers';
import { fromReviews, reviewsActions } from 'src/app/state/reviews';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  constructor(
    private store: Store<AppState>,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  @Input() showButtons = false;
  @Input() review!: Review;

  userReview$ = this.store.select(fromReviews.selectUserReview);

  dialogRef?: DynamicDialogRef;

  openEditReviewDialog() {
    this.dialogRef = this.dialogService.open(UpsertReviewComponent, {
      header: 'Edit review',
      dismissableMask: true,
      data: { review: this.review },
      styleClass: 'sm:w-full xl:w-5',
    });

    this.dialogRef.onClose.pipe(filterNull()).subscribe((edited: ReviewDto) => {
      this.store.dispatch(reviewsActions.updateReview({ reviewId: this.review._id, dto: edited }));
    });
  }

  deleteReview() {
    this.confirmationService.confirm({
      header: 'Delete review confirmation',
      message: 'Are you sure you want to delete your review? This action cannot be reversed.',
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      acceptButtonStyleClass: 'p-button-danger',
      key: 'deleteReviewDialog',
      accept: () => {
        this.store.dispatch(reviewsActions.deleteReview({ id: this.review._id }));
      },
    });
  }
}
