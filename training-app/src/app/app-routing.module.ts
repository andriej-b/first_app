import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PlanComponent } from './plan/plan.component';
import { PlanResolver } from './plan/planResolver.service';
import { UserEditComponent } from './user-profile/user-edit/user-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'plan', component: PlanComponent, resolve: [PlanResolver] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
