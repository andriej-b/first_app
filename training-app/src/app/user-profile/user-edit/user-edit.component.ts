import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editForm!: FormGroup;

  constructor (private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    let name = this.userService.userData.name;
    let username = this.userService.userData.username;
    let email = this.userService.userData.email;
    let imageUrl = this.userService.userData.image;

    this.editForm = new FormGroup({
      'name': new FormControl(name),
      'username': new FormControl(username),
      'email': new FormControl(email),
      'image': new FormControl(imageUrl)
    });

  }

  onSave() {
    const newUserData = new UserModel(
      this.editForm.value['name'],
      this.editForm.value['username'],
      this.editForm.value['email'],
      this.editForm.value['image']
    );

    this.userService.userData = newUserData;
    this.router.navigate(['/profile']);
  }
  onCancel() {
    this.router.navigate(['/profile']);
  }

}
