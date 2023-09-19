import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CompanySearchQuery } from 'src/app/models';
import { searchPipe } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { companiesActions } from 'src/app/state/companies';

@Component({
  selector: 'app-companies-search-filters',
  templateUrl: './companies-search-filters.component.html',
  styleUrls: ['./companies-search-filters.component.scss'],
})
export class CompaniesSearchFiltersComponent implements AfterViewInit, OnDestroy {
  filterForm = this.fb.group({
    name: [''],
    rating: [0],
  });

  valueSub!: Subscription;

  constructor(private store: Store<AppState>, private fb: NonNullableFormBuilder) {}

  ngAfterViewInit(): void {
    this.valueSub = this.filterForm.valueChanges.pipe(searchPipe()).subscribe((query: CompanySearchQuery) => {
      console.log('company', query);
      this.store.dispatch(companiesActions.searchCompanies({ query }));
    });
  }

  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
  }

  get rating() {
    return this.filterForm.get('rating')!;
  }
}
