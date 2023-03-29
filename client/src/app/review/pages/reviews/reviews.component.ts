import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Company } from 'src/app/auth/models/company.interface';
import { UserType } from 'src/app/common/enums/user-type.enum';
import { PaginationResult } from 'src/app/common/models/pagination-result.interface';
import { getTypeof } from 'src/app/common/pipes/user-type-of.pipe';
import { User } from 'src/app/common/types';
import { CompanyService } from 'src/app/company/company.service';
import { PersonService } from 'src/app/person/person.service';
import { PostingService } from 'src/app/posting/posting.service';
import { Review } from '../../models/review.interface';
import { ReviewModule } from '../../review.module';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  reviews: PaginationResult<Review> | null = null;
  company: Company | null = null;
  loggedInUser$ = new Observable<User | null>();
  UserType = UserType;

  pages: number[] = [];

  constructor(
    private authService: AuthService,
    private reviewsService: ReviewService,
    private companyService: CompanyService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      const id: string = paramMap.get('id')!;
      console.log(id);
      this.reviewsService.getCompanyReviews(id).subscribe((reviews) => {
        this.reviews = reviews;
        this.loggedInUser$ = this.authService.loggedInUser$;
        this.pages = Array(reviews.pageCount)
          .fill(0)
          .map((x, i) => i);
      });
      this.companyService.get(id).subscribe((c) => (this.company = c));
    });
  }

  ngOnInit(): void {}
}
