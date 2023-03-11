import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@nbp-it-job-board/models/user';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'nbp-it-job-board-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public user$: Observable<User | null>;

  constructor(private router: Router, private usersService: UsersService) {
    this.user$ = usersService.loggedInUser$;
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  redirectToSearch() {
    this.router.navigate(['/search']);
  }

  redirectToProfile(id: string) {
    console.log(id);
    this.router.navigate(['/user/' + id]);
  }

  logout() {
    window.localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
