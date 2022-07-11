import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PlanComponent } from './plan/plan.component';
import { UserEditComponent } from './user-profile/user-edit/user-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'profile', component: UserProfileComponent
  },
  { path: 'plan', component: PlanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
