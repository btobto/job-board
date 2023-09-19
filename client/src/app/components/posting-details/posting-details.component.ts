import { Component, Input, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { Posting } from 'src/app/models';
import { getLocationString } from 'src/app/shared/helpers';

interface PostingInfo {
  icon: PrimeIcons;
  value?: string | null;
}

@Component({
  selector: 'app-posting-details',
  templateUrl: './posting-details.component.html',
  styleUrls: ['./posting-details.component.scss'],
})
export class PostingDetailsComponent implements OnInit {
  @Input() posting!: Posting;
  postingDetails: PostingInfo[] = [];

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
}
