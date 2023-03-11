import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@nbp-it-job-board/models/user';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nbp-it-job-board-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  user: User | null = null;
  loggedInUser$ = new Observable<User | null>();

  showEditForm: boolean = false;

  name: string;
  country: string;
  city: string;
  skills: string;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      const id: string = paramMap.get('id')!;
      console.log(id);
      this.usersService.getUser(id).subscribe((user) => {
        this.user = user;
        this.loggedInUser$ = this.usersService.loggedInUser$;
      });
    });
  }

  updateUser(id: string) {
    let skills: string[];
    skills = this.skills.split(',').map((s) => s.trim());
    const location = { country: this.country, city: this.city };
    this.usersService.update(id, {
      name: this.name,
      // location: location,
      skills: skills,
    });
  }

  deleteUser(id: string) {
    this.usersService.delete(id).subscribe(() => {
      window.localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
