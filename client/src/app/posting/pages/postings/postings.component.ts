import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Company } from 'src/app/auth/models/company.interface';
import { UserType } from 'src/app/common/enums/user-type.enum';
import { User } from 'src/app/common/types';
import { CompanyService } from 'src/app/company/company.service';
import { Review } from 'src/app/review/models/review.interface';
import { Posting } from '../../models/posting.interface';
import { PostingService } from '../../posting.service';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.scss'],
})
export class PostingsComponent implements OnInit {
  postings: Posting[] | null = null;
  company: Company | null = null;
  loggedInUser$ = new Observable<User | null>();
  UserType = UserType;

  constructor(
    private authService: AuthService,
    private postingService: PostingService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      const id: string = paramMap.get('id')!;
      console.log(id);
      this.postingService.getCompanyPostings(id).subscribe((postings) => {
        this.postings = postings;
        this.loggedInUser$ = this.authService.loggedInUser$;
      });
      this.companyService.get(id).subscribe((c) => (this.company = c));
    });
  }

  apply(id: string) {
    this.postingService.apply(id).subscribe();
  }

  ngOnInit(): void {}
}
