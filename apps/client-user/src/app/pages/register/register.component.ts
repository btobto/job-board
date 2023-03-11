import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserCreateDto } from '@nbp-it-job-board/models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'nbp-it-job-board-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  name: string = '';

  constructor(private usersService: UsersService, private router: Router) {}

  register() {
    if (this.email != '' && this.name != '') {
      this.usersService
        .register({ name: this.name, email: this.email })
        .subscribe({
          next: (user) => {
            this.router.navigate(['/home']);
          },
          error: () => {
            alert('Error registering ');
          },
        });
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
