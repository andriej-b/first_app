import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserEditComponent } from './user-profile/user-edit/user-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'profile', component: UserProfileComponent, children: [
      { path: "edit", component: UserEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
