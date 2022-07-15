import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedUserSub: Subscription;
  isLoggedIn: boolean = false;
  navLinks: any[];
  constructor (private authService: AuthService) {
    this.navLinks = [
      {
        label: 'Plans',
        link: '/plan',
        index: 0
      },
      {
        label: 'Summary',
        link: '/summary',
        index: 1
      },
      {
        label: 'My Account',
        link: '/profile',
        index: 2
      },
      {
        label: 'Login',
        link: '/auth',
        index: 3
      },
      {
        label: 'Logout',
        link: '/',
        index: 4
      },
    ];
  }

  ngOnInit(): void {
    this.loggedUserSub = this.authService.user.subscribe((user) => {
      if (user == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
  }
  onLogout(index: number) {
    if (index === 4 && this.isLoggedIn) {
      this.authService.logout();
    }
  }

  ngOnDestroy(): void {
    this.loggedUserSub.unsubscribe();
  }

}
