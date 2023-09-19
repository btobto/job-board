import { Component, Input, OnInit } from '@angular/core';
import { PostingPopulated } from 'src/app/models/posting/posting-populated.model';
import { getLocationString, getUserImageUrl } from 'src/app/shared/helpers';

@Component({
  selector: 'app-posting-search-card',
  templateUrl: './posting-search-card.component.html',
  styleUrls: ['./posting-search-card.component.scss'],
})
export class PostingSearchCardComponent {
  @Input() posting!: PostingPopulated;

  getImageUrl() {
    return getUserImageUrl(this.posting.company);
  }

  getLocation() {
    return getLocationString(this.posting.location!);
  }
}
