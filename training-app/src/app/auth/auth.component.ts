/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-profile/user.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
// eslint-disable-next-line import/prefer-default-export
export class AuthComponent implements OnInit {
  registerMode = false;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor (
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // console.log(this.userForm);
    // console.log(this.userForm);
    const { email } = this.userForm.value;
    const { password } = this.userForm.value;
    if (this.registerMode) {
      let initData = this.userForm.value['email'];
      this.userService.setUserData(initData!);
      this.authService.register(email, password).subscribe(
        (resData) => {
          // console.log(resData);
        },
        (error) => {
          console.log(error);
        },
      );
      this.userService.setUserData(email);
    } else {
      this.authService.login(email, password).subscribe((resData) => {
        // console.log(resData);

      });
    }
    this.router.navigate(['/profile']);
  }

  switchMode() {
    this.registerMode = !this.registerMode;
  }
}
