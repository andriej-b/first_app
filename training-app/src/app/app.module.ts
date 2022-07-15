import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-profile/user-edit/user-edit.component';
import { PlanComponent } from './plan/plan.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlanEditComponent } from './plan/plan-edit/plan-edit.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TrainingPlanComponent } from './plan/training-plan/training-plan.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    UserProfileComponent,
    UserEditComponent,
    PlanComponent,
    PlanEditComponent,
    TrainingPlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
