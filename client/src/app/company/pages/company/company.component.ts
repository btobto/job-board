import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Company } from 'src/app/auth/models/company.interface';
import { Location } from 'src/app/common/models/location.interface';
import { User } from 'src/app/common/types';
import { PersonService } from 'src/app/person/person.service';
import { CompanyService } from '../../company.service';
import { CompanyUpdateDto } from '../../models/company-update.dto';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  company: Company | null = null;
  loggedInUser$ = new Observable<User | null>();

  showEditForm: boolean = false;

  name = '';
  website = '';
  description = '';
  offices: Location[] = [];

  newLocation: Location = {
    country: '',
    city: '',
    address: '',
  };

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      const id: string = paramMap.get('id')!;
      console.log(id);
      this.companyService.get(id).subscribe((company) => {
        this.company = company;
        this.loggedInUser$ = this.authService.loggedInUser$;

        this.name = company.name;
        this.website = company.website;
        this.description = company.description;
        this.offices = JSON.parse(JSON.stringify(company.offices));
      });
    });
  }

  deleteCompany() {
    this.companyService.delete(this.company!._id).subscribe();
  }

  updateCompany() {
    const dto: CompanyUpdateDto = {
      offices: this.offices,
    };

    if (this.name && this.name !== this.company!.name) {
      dto.name = this.name;
    }

    if (this.website && this.website !== this.company!.website) {
      dto.website = this.website;
    }

    if (this.description && this.description !== this.company!.description) {
      dto.description = this.description;
    }

    this.companyService
      .update(this.company!._id, dto)
      .subscribe((c) => (this.company = c));
  }

  removeLocation(i: number) {
    this.offices.slice(i, 1);
  }

  addLocation() {
    const { country, city, address } = this.newLocation;

    if (country && city) {
      if (address) {
        this.offices.push(JSON.parse(JSON.stringify(this.newLocation)));
      } else {
        this.offices.push(JSON.parse(JSON.stringify({ country, city })));
      }
    }

    console.log(this.offices);
  }

  ngOnInit(): void {}
}
