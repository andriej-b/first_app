import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'training-app';
  constructor (
    public auth: AuthService) { }
  ngOnInit() {
    this.auth.error$.subscribe(error => {
      console.log(error);

    });
  }
}
