import { Injectable } from "@angular/core";
import { UserModel } from "../shared/user.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  // editMode = false;
  userData: UserModel = {
    username: 'sample username',
    name: 'sample name',
    email: 'test@test',
    image: '../../assets/images/Screenshot from 2022-07-08 09-03-03.png',


  };
}
