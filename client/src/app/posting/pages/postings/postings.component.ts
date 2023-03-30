import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Company } from 'src/app/auth/models/company.interface';
import { UserType } from 'src/app/common/enums/user-type.enum';
import { User } from 'src/app/common/types';
import { CompanyService } from 'src/app/company/company.service';
import { ReviewCreateDto } from 'src/app/review/models/review-create.dto';
import { Review } from 'src/app/review/models/review.interface';
import { PostingCreateDto } from '../../models/posting-create.dto';
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

  position: string = '';
  country = '';
  city = '';
  description = '';
  remote: boolean = false;
  skills: string[] = [];
  newSkill = '';
  salary = '';

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

  deletePosting(id: string) {
    this.postingService.delete(id).subscribe();
  }

  removeSkill(i: number) {
    this.skills.slice(i, 1);
  }

  addNewSkill() {
    if (this.newSkill) {
      this.skills.push(this.newSkill.trim());
      this.newSkill = '';
    }
  }

  createPosting() {
    const dto: PostingCreateDto = {
      remote: this.remote,
      requirements: this.skills,
      position: this.position,
    };

    dto.location = {};

    if (!this.position) {
      alert('position required');
      return;
    }

    if (!this.country) {
      alert('country required');
      return;
    } else {
      dto.location.country = this.country;
    }

    if (!this.city) {
      alert('city required');
      return;
    } else {
      dto.location.city = this.city;
    }

    if (!this.salary) {
      alert('salary required');
      return;
    } else {
      dto.salary = this.salary;
    }

    if (this.description) dto.description = this.description;

    if (this.skills.length == 0) {
      alert('requirements must not be empty');
      return;
    }

    this.postingService.post(dto).subscribe((p) => {
      location.reload();
    });
  }

  ngOnInit(): void {}
}
