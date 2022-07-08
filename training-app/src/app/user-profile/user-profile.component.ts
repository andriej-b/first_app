import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData = {
    username: 'sample username',
    name: 'sample name',
    email: 'test@test',
    image: '../../assets/images/Screenshot from 2022-07-08 09-03-03.png',


  };
  constructor () { }

  ngOnInit(): void {
  }

}
