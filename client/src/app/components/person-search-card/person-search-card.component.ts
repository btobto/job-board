import { Component, Input } from '@angular/core';
import { Person } from 'src/app/models';
import { getLocationString, getUserImageUrl } from 'src/app/shared/helpers';

@Component({
  selector: 'app-person-search-card',
  templateUrl: './person-search-card.component.html',
  styleUrls: ['./person-search-card.component.scss'],
})
export class PersonSearchCardComponent {
  @Input() person!: Person;

  getLocation() {
    return getLocationString(this.person.location!);
  }

  getImageUrl() {
    return getUserImageUrl(this.person);
  }
}
