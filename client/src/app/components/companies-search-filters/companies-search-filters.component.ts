import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CompanySearchQuery } from 'src/app/models';
import { searchPipe } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { companiesActions } from 'src/app/state/companies';

@UntilDestroy()
@Component({
  selector: 'app-companies-search-filters',
  templateUrl: './companies-search-filters.component.html',
  styleUrls: ['./companies-search-filters.component.scss'],
})
export class CompaniesSearchFiltersComponent implements AfterViewInit {
  filterForm = this.fb.group({
    name: [''],
    rating: [0],
  });

  constructor(private store: Store<AppState>, private fb: NonNullableFormBuilder) {}

  ngAfterViewInit(): void {
    this.filterForm.valueChanges.pipe(searchPipe(), untilDestroyed(this)).subscribe((query: CompanySearchQuery) => {
      console.log('company', query);
      this.store.dispatch(companiesActions.searchCompanies({ query }));
    });
  }

  get rating() {
    return this.filterForm.get('rating')!;
  }
}
