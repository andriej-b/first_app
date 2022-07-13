import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedUserSub: Subscription;
  isLoggedIn: boolean = false;
  constructor (private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUserSub = this.authService.user.subscribe((user) => {
      if (user == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
    this.authService.autoLogin();
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.loggedUserSub.unsubscribe();
  }

}
