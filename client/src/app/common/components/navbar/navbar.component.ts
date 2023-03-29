import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserType } from '../../enums/user-type.enum';
import { User } from '../../types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$ = new BehaviorSubject<User | null>(null);
  UserType = UserType;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.loggedInUser$;
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
