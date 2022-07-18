import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, map, retry, tap } from "rxjs/operators";
import { PlanService } from "../plan/plan.service";
import { TrainingPlan } from "./trainingPlan.model";

import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService implements OnInit {
  userToken: string = null;
  constructor (private http: HttpClient,
    private planService: PlanService,
  ) {

  }

  ngOnInit(): void {

  }

  fetchData() {
    return this.http.get<TrainingPlan[]>(`${env.dev.serverUrl}/api/plans/getPlans`).pipe(
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
    return this.http.put<TrainingPlan[]>(`${env.dev.serverUrl}/api/plans/setPlans`, trainingData).subscribe(response => {

      console.log(trainingData);

    });
  }

}
