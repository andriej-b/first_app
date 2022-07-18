import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  constructor () {
    this.navLinks = [
      {
        label: 'Plans',
        link: '/plan',
        index: 0
      },
      {
        label: 'My Account',
        link: '/profile',
        index: 1
      }
    ];
  }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    this.loggedUserSub.unsubscribe();
  }

}
