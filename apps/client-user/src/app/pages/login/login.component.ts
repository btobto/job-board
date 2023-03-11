import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'nbp-it-job-board-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';

  constructor(private usersService: UsersService, private router: Router) {}

  login() {
    if (this.email != '') {
      this.usersService.login(this.email).subscribe({
        next: (user) => {
          this.router.navigate(['/home']);
        },
        error: () => {
          alert('Error logging in.');
        },
      });
    }
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
