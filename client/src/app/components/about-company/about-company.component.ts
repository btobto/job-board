import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filterNull } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { fromCompanies } from 'src/app/state/companies';

@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.scss'],
})
export class AboutCompanyComponent {
  constructor(private store: Store<AppState>) {}

  company$ = this.store.select(fromCompanies.selectSelectedCompany).pipe(filterNull());
}
