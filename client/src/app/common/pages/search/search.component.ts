import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Company } from 'src/app/auth/models/company.interface';
import { Person } from 'src/app/auth/models/person.interface';
import { CompanyService } from 'src/app/company/company.service';
import { CompanySearchQueryDto } from 'src/app/company/models/company-search-query.dto';
import { PersonSearchQueryDto } from 'src/app/person/models/person-search-query.dto';
import { PersonService } from 'src/app/person/person.service';
import { PostingSearchQueryDto } from 'src/app/posting/models/posting-search-query.dto';
import { Posting } from 'src/app/posting/models/posting.interface';
import { PostingService } from 'src/app/posting/posting.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchType = ['User', 'Company', 'Posting'];
  checked: string = 'User';

  name = '';
  country = '';
  city = '';
  skills: string[] = [];
  newSkill: string = '';
  rating: number = 0;
  remote: boolean = false;
  position = '';

  people: Person[] = [];
  companies: Company[] = [];
  postings: Posting[] = [];

  constructor(
    private personService: PersonService,
    private companyService: CompanyService,
    private postingService: PostingService
  ) {}

  ngOnInit(): void {}

  select(e: any, f: string) {
    if (e.target.checked) {
      this.checked = f;
    }
  }

  removeSkill(i: number) {
    this.skills.splice(i, 1);
  }

  addNewSkill() {
    if (this.newSkill) {
      this.skills.push(this.newSkill);
      this.newSkill = '';
    }
  }

  searchUsers() {
    const dto: PersonSearchQueryDto = {};

    if (this.skills.length > 0) {
      dto.skills = this.skills;
    }

    const location: { country?: string; city?: string } = {};

    if (this.name) {
      dto.name = this.name;
    }

    if (this.country) {
      location.country = this.country;
    }

    if (this.city) {
      location.city = this.city;
    }

    if (Object.keys(location).length > 0) {
      dto.location = location;
    }

    console.log(dto);

    this.personService.search(dto).subscribe((p) => {
      console.log(p);
      this.people = [];
      this.people = p;
    });
  }

  searchCompanies() {
    const dto: CompanySearchQueryDto = {};

    if (this.name) {
      dto.name = this.name;
    }

    if (this.rating >= 0 && this.rating < 6) {
      dto.rating = this.rating;
    }

    this.companyService.search(dto).subscribe((c) => {
      console.log(c);
      this.companies = [];
      this.companies = c;
    });
  }

  searchPostings() {
    const dto: PostingSearchQueryDto = {
      remote: this.remote,
    };

    if (this.skills.length > 0) {
      dto.requirements = this.skills;
    }

    const location: { country?: string; city?: string } = {};

    if (this.country) {
      location.country = this.country;
    }

    if (this.city) {
      location.city = this.city;
    }

    if (Object.keys(location).length > 0) {
      dto.location = location;
    }

    if (this.position) dto.position = this.position;

    console.log(dto);
    this.postingService.search(dto).subscribe((p) => {
      console.log(p);
      this.postings = [];
      this.postings = p;
    });
  }

  asCompany(company: any): Company {
    return company as Company;
  }
}
