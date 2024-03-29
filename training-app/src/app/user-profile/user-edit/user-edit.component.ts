import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/shared/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  editForm = new FormGroup({
    'name': new FormControl(''),
    'username': new FormControl(''),
    'email': new FormControl(''),
    'image': new FormControl('')
  });
  subscription: Subscription;
  editMode = false;
  userData: UserModel;

  constructor (private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    let user = this.userService.getUserData();

    this.editForm = new FormGroup({
      'name': new FormControl(user.name),
      'username': new FormControl(user.username),
      'email': new FormControl(user.email),
      'image': new FormControl(user.image)
    });

  }

  onSave() {
    let newUserData = new UserModel(
      this.editForm.value['username']!,
      this.editForm.value['name']!,
      this.editForm.value['email']!,
      this.editForm.value['image']!
    );
    this.userService.startedEditMode.next(false);

    this.userService.updateUserData(newUserData);


  }
  onCancel() {
    this.userService.startedEditMode.next(false);
    this.editForm.reset();
  }
  ngOnDestroy(): void {
  }
}
