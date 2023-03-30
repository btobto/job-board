import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Person } from 'src/app/auth/models/person.interface';
import { User } from 'src/app/common/types';
import { PersonService } from '../../person.service';
import { PersonUpdateDto } from '../../models/person-update.dto';
import { WorkExperience } from 'src/app/common/models/work-experience.interface';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  person: Person | null = null;
  loggedInUser$ = new Observable<User | null>();

  showEditForm: boolean = false;

  name = '';
  country = '';
  city = '';
  skills: string[] = [];
  workExperience: WorkExperience[] = [];

  newSkill = '';
  newWorkExperience: WorkExperience = {
    companyName: '',
    yearFrom: new Date().getFullYear(),
  };

  constructor(
    private authService: AuthService,
    private personService: PersonService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      const id: string = paramMap.get('id')!;
      console.log(id);
      this.personService.get(id).subscribe((person) => {
        this.person = person;

        this.loggedInUser$ = this.authService.loggedInUser$;

        this.name = person.name;
        this.country = person.location?.country ?? '';
        this.city = person.location?.city ?? '';
        this.skills = person.skills.slice();
        this.workExperience = JSON.parse(JSON.stringify(person.prevExperience));
      });
    });
  }
  ngOnInit(): void {}

  updateUser() {
    const location = { country: this.country, city: this.city };

    const updateDto: PersonUpdateDto = {
      skills: this.skills,
      prevExperience: this.workExperience,
    };

    if (this.name && this.name !== this.person!.name) {
      updateDto.name = this.name;
    }

    if (this.country && this.city) {
      updateDto.location = location;
    }

    console.log(updateDto);

    this.personService
      .update(this.person!._id, updateDto)
      .subscribe((p) => (this.person = p));
  }

  removeSkill(i: number) {
    this.skills.slice(i, 1);
  }

  addNewSkill() {
    if (this.newSkill && !this.person!.skills.includes(this.newSkill.trim())) {
      this.skills.push(this.newSkill.trim());
      this.newSkill = '';
    }
  }

  removeExperience(i: number) {
    this.workExperience.slice(i, 1);
  }

  addNewWorkExperience() {
    const { companyName, yearFrom, yearTo } = this.newWorkExperience;

    if (companyName && yearFrom) {
      const exp: WorkExperience = {
        companyName,
        yearFrom,
      };

      if (yearTo) exp.yearTo = yearTo;

      this.workExperience.push(JSON.parse(JSON.stringify(exp)));

      console.log(this.workExperience);

      this.newWorkExperience.companyName = '';
      this.newWorkExperience.yearFrom = new Date().getFullYear();
      this.newWorkExperience.yearTo = undefined;
    }
  }

  deleteUser() {
    this.personService.delete(this.person!._id).subscribe();
  }
}
