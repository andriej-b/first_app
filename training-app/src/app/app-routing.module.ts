import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PlanComponent } from './plan/plan.component';
import { PlanResolver } from './plan/planResolver.service';
import { UserEditComponent } from './user-profile/user-edit/user-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [

  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'plan', component: PlanComponent, resolve: [PlanResolver], canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
