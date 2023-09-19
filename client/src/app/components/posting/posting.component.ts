import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Company, Location, Posting, PostingDto, User } from 'src/app/models';
import { UserType } from 'src/app/shared/enums';
import { filterNull, getLocationString, getUserType } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { fromUser } from 'src/app/state/user';
import { UpsertPostingComponent } from '../upsert-posting/upsert-posting.component';
import { postingsActions } from 'src/app/state/postings';
import { ApplicantsDialogComponent } from '../applicants-dialog/applicants-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { DIALOG_DEFAULT } from 'src/app/shared/constants';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss'],
})
export class PostingComponent implements AfterViewInit, OnDestroy {
  UserType = UserType;
  @Input() posting!: Posting;

  user$ = this.store.select(fromUser.selectUser);

  dialogRef?: DynamicDialogRef;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngAfterViewInit(): void {
    this.activatedRoute.fragment.pipe(filterNull()).subscribe((fragment) => {
      this.viewportScroller.scrollToAnchor(fragment);
    });
  }

  ngOnDestroy(): void {
    if (this.dialogRef) this.dialogRef.destroy();
  }

  openEditPostingDialog(company: User) {
    this.dialogRef = this.dialogService.open(UpsertPostingComponent, {
      ...DIALOG_DEFAULT,
      header: 'Edit posting',
      data: { locations: (company as Company).locations, posting: this.posting },
    });

    this.dialogRef.onClose.pipe(filterNull()).subscribe((postingDto) => {
      this.updatePosting(this.posting._id, postingDto);
    });
  }

  updatePosting(postingId: string, dto: PostingDto) {
    this.store.dispatch(postingsActions.updatePosting({ postingId, dto }));
  }

  openApplicantsDialog() {
    this.dialogRef = this.dialogService.open(ApplicantsDialogComponent, {
      header: 'Applicants',
      dismissableMask: true,
      data: { postingId: this.posting._id },
      styleClass: 'sm:w-full xl:w-7',
    });
  }

  deletePosting() {
    this.confirmationService.confirm({
      header: 'Delete posting confirmation',
      message: 'Are you sure you want to delete this posting? This action cannot be reversed.',
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      acceptButtonStyleClass: 'p-button-danger',
      key: 'deletePostingDialog',
      accept: () => {
        this.store.dispatch(postingsActions.deletePosting({ id: this.posting._id }));
      },
    });
  }

  toggleApply() {
    this.store.dispatch(postingsActions.toggleApplyPosting({ postingId: this.posting._id }));
  }

  getPostingLocationString(location: Location) {
    return getLocationString(location);
  }
}
