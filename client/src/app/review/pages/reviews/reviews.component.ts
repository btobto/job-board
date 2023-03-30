import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Company } from 'src/app/auth/models/company.interface';
import { UserType } from 'src/app/common/enums/user-type.enum';
import { PaginationResult } from 'src/app/common/models/pagination-result.interface';
import {
  getTypeof,
  UserTypeOfPipe,
} from 'src/app/common/pipes/user-type-of.pipe';
import { User } from 'src/app/common/types';
import { CompanyService } from 'src/app/company/company.service';
import { PersonService } from 'src/app/person/person.service';
import { PostingService } from 'src/app/posting/posting.service';
import { ReviewCreateDto } from '../../models/review-create.dto';
import { ReviewUpdateDto } from '../../models/review-update.dto';
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

  showEditForm = false;

  pages: number[] = [];

  rating = 5;
  description = '';

  review: Review | null = null;

  constructor(
    private authService: AuthService,
    private reviewsService: ReviewService,
    private companyService: CompanyService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private userPipe: UserTypeOfPipe
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      const id: string = paramMap.get('id')!;
      console.log(id);
      this.reviewsService.getCompanyReviews(id).subscribe((reviews) => {
        this.reviews = reviews;
        this.loggedInUser$ = this.authService.loggedInUser$;

        this.loggedInUser$.subscribe((u) => {
          if (userPipe.transform(u!) === UserType.Person) {
            this.getPersonReview();
          }
        });

        this.pages = Array(reviews.pageCount)
          .fill(0)
          .map((x, i) => i);
      });
      this.companyService.get(id).subscribe((c) => (this.company = c));
    });
  }

  ngOnInit(): void {}

  getPersonReview() {
    // console.log('company', this.company!._id);
    // console.log('user', JSON.parse(localStorage.getItem('user')!)._id);

    this.reviewsService.getUserReviewForCompany(this.company!._id).subscribe({
      next: (r) => {
        if (r) {
          this.rating = r.rating;
          this.description = r.description ?? '';
        }
        this.review = r;
      },
      error: () => {
        console.log('nema ga');
        this.review = null;
      },
    });

    return this.review;
  }

  deleteReview() {
    this.reviewsService.delete(this.review!._id).subscribe(() => {
      location.reload();
    });
  }

  postReview() {
    const dto: ReviewCreateDto = {
      rating: this.rating,
    };

    if (this.description) dto.description = this.description;

    this.reviewsService.post(this.company!._id, dto).subscribe((r) => {
      location.reload();
    });
  }

  updateReview() {
    const dto: ReviewUpdateDto = {
      rating: this.rating,
    };

    if (this.description) dto.description = this.description;

    this.reviewsService.update(this.review!._id, dto).subscribe((r) => {
      location.reload();
    });
  }
}
