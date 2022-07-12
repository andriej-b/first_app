import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { TrainingPlan } from "../shared/trainingPlan.model";
import { PlanService } from "./plan.service";

@Injectable({
  providedIn: 'root'
})
export class PlanResolver implements Resolve<TrainingPlan[]> {
  constructor (private planService: PlanService,
    private dataStorageService: DataStorageService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TrainingPlan[] | Observable<TrainingPlan[]> | Promise<TrainingPlan[]> {
    const trainings = this.planService.getTrainingPlans();
    if (trainings.length === 0) {
      return this.dataStorageService.fetchData();
    } else {
      return trainings;
    }

  }
}
