import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-profile/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  registerMode = false;
  constructor (private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.userForm);
    if (this.registerMode) {
      let initData = this.userForm.value['email'];
      this.userService.setUserData(initData!);
    } else {

      //...
    }
    this.router.navigate(['/profile']);
  }

  switchMode() {
    this.registerMode = !this.registerMode;
  }

}
