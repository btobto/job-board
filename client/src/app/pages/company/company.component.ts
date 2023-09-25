import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditCompanyComponent } from 'src/app/components/edit-company/edit-company.component';
import { Company, Location, CompanyUpdateDto, User } from 'src/app/models';
import { DIALOG_DEFAULT } from 'src/app/shared/constants';
import { UserType } from 'src/app/shared/enums';
import { filterNull, getLocationString, getUserImageUrl, getUserType } from 'src/app/shared/helpers';
import { selectUserAndCompany } from 'src/app/state/app.selectors';
import { AppState } from 'src/app/state/app.state';
import { companiesActions } from 'src/app/state/companies';
import { reviewsActions } from 'src/app/state/reviews';
import { userActions } from 'src/app/state/user';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  users$ = this.store.select(selectUserAndCompany).pipe(filterNull());
  dialogRef?: DynamicDialogRef;

  tabs: MenuItem[] = [
    {
      label: 'About',
      icon: 'pi pi-fw pi-info-circle',
      routerLink: ['about'],
    },
    {
      label: 'Postings',
      icon: 'pi pi-fw pi-briefcase',
      routerLink: ['postings'],
    },
    {
      label: 'Reviews',
      icon: 'pi pi-fw pi-file',
      routerLink: ['reviews'],
    },
  ];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.store.dispatch(companiesActions.loadCompany({ companyId: params['id'] }));
    });
  }

  ngOnDestroy(): void {
    if (this.dialogRef) this.dialogRef.destroy();

    this.store.dispatch(reviewsActions.clearReviews());
  }

  openEditCompanyDialog(company: Company) {
    this.dialogRef = this.dialogService.open(EditCompanyComponent, {
      ...DIALOG_DEFAULT,
      header: 'Edit company profile',
      data: { company },
    });

    this.dialogRef.onClose.pipe(filterNull()).subscribe((updatedCompany: CompanyUpdateDto) => {
      this.updateCompany(company._id, updatedCompany);
    });
  }

  updateCompany(companyId: string, updatedCompany: CompanyUpdateDto) {
    console.log('From dialog:', updatedCompany);
    this.store.dispatch(userActions.updateCompany({ id: companyId, payload: updatedCompany }));
  }

  deleteCompany(company: Company) {
    this.confirmationService.confirm({
      header: 'Delete account confirmation',
      message: 'Are you sure you want to delete your account? This action cannot be reversed.',
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      acceptButtonStyleClass: 'p-button-danger',
      key: 'deleteCompanyDialog',
      accept: () => {
        console.log('Deleting company');
        this.store.dispatch(userActions.deleteCompany({ id: company._id }));
      },
    });
  }

  getCompanyLocation(location: Location): string {
    return getLocationString(location);
  }

  getImageUrl(company: Company) {
    return getUserImageUrl(company);
  }

  isCompanyLoggedInUser(company: Company, loggedInUser: User): boolean {
    return getUserType(loggedInUser) === UserType.Company && company._id === loggedInUser._id;
  }
}
