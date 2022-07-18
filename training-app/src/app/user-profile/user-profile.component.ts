import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { UserModel } from '../shared/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user!: UserModel;
  editMode = false;
  private subscription: Subscription;
  private editSub: Subscription;

  constructor (private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserData();
    this.subscription = this.userService.userChanged.subscribe((user: UserModel) => {
      this.user = user;
    });
    this.editSub = this.userService.startedEditMode.subscribe((editMode: boolean) => {
      this.editMode = editMode;
    });
    this.editMode = false;
    this.auth.user$.subscribe((profile) => {
      this.user = {
        email: profile.email,
        username: profile.nickname,
        name: profile.name,
        image: profile.picture
      };
    });


  }
  onEdit() {
    this.editMode = true;
    this.userService.startedEditMode.next(this.editMode);
  }
  onDelete() {
    this.userService.deleteUserData();
    this.router.navigate(['/auth']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.editSub.unsubscribe();
  }
}
