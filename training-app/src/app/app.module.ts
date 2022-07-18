import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-profile/user-edit/user-edit.component';
import { PlanComponent } from './plan/plan.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlanEditComponent } from './plan/plan-edit/plan-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TrainingPlanComponent } from './plan/training-plan/training-plan.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserProfileComponent,
    UserEditComponent,
    PlanComponent,
    PlanEditComponent,
    TrainingPlanComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [
          `${env.dev.serverUrl}/api/plans/getPlans`,
          `${env.dev.serverUrl}/api/plans/setPlans`
        ],
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
