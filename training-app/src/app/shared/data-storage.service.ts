import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, map, retry, tap } from "rxjs/operators";
import { PlanService } from "../plan/plan.service";
import { TrainingPlan } from "./trainingPlan.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService implements OnInit {
  userToken: string = null;
  constructor (private http: HttpClient,
    private planService: PlanService,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.userToken = user.token;
    });
  }

  fetchData() {

    return this.http.get<TrainingPlan[]>(
      'https://ng-project-9ef3b-default-rtdb.europe-west1.firebasedatabase.app/trainingPlans.json'
    ).pipe(
      map(trainings => {
        return trainings.map(training => {
          return {
            ...training,
            exercises: training.exercises ? training.exercises : []
          };
        });
      }),
      tap(trainings => {
        this.planService.setTrainingPlans(trainings);
      })
    );

  }
  storeData() {
    const trainingData = this.planService.getTrainingPlans();

    this.http.put(
      'https://ng-project-9ef3b-default-rtdb.europe-west1.firebasedatabase.app/trainingPlans.json',
      trainingData
    ).subscribe((response) => {
      console.log(response);
    });
  }
  // deleteData(index: number) {
  //   return this.http.delete(`https://ng-project-9ef3b-default-rtdb.europe-west1.firebasedatabase.app/trainingPlans.json/${index}`);
  // }
}
