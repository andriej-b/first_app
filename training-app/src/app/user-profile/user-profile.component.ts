import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../shared/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!: UserModel;
  editMode = false;
  constructor (private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.userData;
    this.editMode = false;
  }
  onEdit() {
    this.editMode = true;
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDelete() {
    console.log('delete user');

  }
}
