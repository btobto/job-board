import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss'],
})
export class PostingComponent implements OnInit, OnDestroy {
  UserType = UserType;
  @Input() posting!: Posting;

  user$ = this.store.select(fromUser.selectUser);

  postingDetails: { icon: PrimeIcons; value?: string | null }[] = [];
  dialogRef?: DynamicDialogRef;

  constructor(
    private store: Store<AppState>,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.postingDetails = [
      {
        icon: PrimeIcons.MONEY_BILL,
        value: this.posting.salary,
      },
      {
        icon: PrimeIcons.MAP_MARKER,
        value: this.posting.location ? getLocationString(this.posting.location) : null,
      },
      {
        icon: PrimeIcons.GLOBE,
        value: this.posting.remoteAvailable ? 'Remote available' : null,
      },
    ];
  }

  ngOnDestroy(): void {
    if (this.dialogRef) this.dialogRef.destroy();
  }

  openEditPostingDialog(company: User) {
    this.dialogRef = this.dialogService.open(UpsertPostingComponent, {
      header: 'Edit posting',
      dismissableMask: true,
      data: { locations: (company as Company).locations, posting: this.posting },
      styleClass: 'sm:w-full xl:w-5',
      contentStyle: {
        'padding-bottom': '90px',
      },
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
