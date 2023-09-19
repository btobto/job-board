import { Component, Input, OnInit } from '@angular/core';
import { PostingLabel } from 'src/app/models';
import { PostingPopulated } from 'src/app/models/posting-populated.model';
import { getLocationString, getPostingLabels, getUserImageUrl } from 'src/app/shared/helpers';

@Component({
  selector: 'app-posting-search-card',
  templateUrl: './posting-search-card.component.html',
  styleUrls: ['./posting-search-card.component.scss'],
})
export class PostingSearchCardComponent implements OnInit {
  @Input() posting!: PostingPopulated;
  postingLabels: PostingLabel[] = [];

  ngOnInit(): void {
    this.postingLabels = getPostingLabels(this.posting);
  }

  getImageUrl() {
    return getUserImageUrl(this.posting.company);
  }

  getLocation() {
    return getLocationString(this.posting.location!);
  }
}
