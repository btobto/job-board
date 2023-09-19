import { Component, Input } from '@angular/core';
import { Company } from 'src/app/models';
import { getUserImageUrl } from 'src/app/shared/helpers';

@Component({
  selector: 'app-company-search-card',
  templateUrl: './company-search-card.component.html',
  styleUrls: ['./company-search-card.component.scss'],
})
export class CompanySearchCardComponent {
  @Input() company!: Company;

  getImageUrl() {
    return getUserImageUrl(this.company);
  }
}
