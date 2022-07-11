import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { UserModel } from "../shared/user.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  userChanged = new Subject<UserModel>();
  startedEditMode = new Subject<boolean>();
  private userData: UserModel = {
    username: 'sample username',
    name: 'sample name',
    email: 'test@test',
    image: '../../assets/images/Screenshot from 2022-07-08 09-03-03.png',
  };

  getUserData() {
    return this.userData;
  }
  updateUserData(newUserData: UserModel) {
    this.userData = newUserData;
    this.userChanged.next(this.userData);
  }
  deleteUserData() {
    this.userData = new UserModel('', '', '', '');
  }
  setUserData(email: string) {
    this.userData = {
      username: '',
      name: '',
      email: email,
      image: '',

    };
  }
}
