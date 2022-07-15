import { Injectable } from "@angular/core";

import { BehaviorSubject, Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { TrainingPlan, Exercise } from "../shared/trainingPlan.model";

interface UpdateModel {
  mode: boolean,
  index: number;
}

@Injectable({ providedIn: 'root' })
export class PlanService {
  // isEditMode = new Subject<boolean>();
  isUpdating = new BehaviorSubject<UpdateModel>({ mode: false, index: null });
  trainingPlanEdited = new Subject<TrainingPlan>();
  trainingPlansChanged = new Subject<TrainingPlan[]>();
  // constructor (private dataStorageService: DataStorageService) {


  private trainingPlans: TrainingPlan[] = [];
  // = [
  //   new TrainingPlan('Training A', [
  //     {
  //       name: 'ohp',
  //       description: 'test',
  //       series: '3',
  //       reps: '12',
  //       weight: '20'
  //     },
  //     {
  //       name: 'shrugs',
  //       description: 'shrugs test',
  //       series: '4',
  //       reps: '10',
  //       weight: '10'
  //     }
  //   ]),
  //   new TrainingPlan('Training B', [
  //     {
  //       name: 'shrugs1',
  //       description: 'shrugs test',
  //       series: '4',
  //       reps: '10',
  //       weight: '10'
  //     },
  //     {
  //       name: 'shrugs2',
  //       description: 'shrugs test',
  //       series: '4',
  //       reps: '10',
  //       weight: '10'
  //     },
  //     {
  //       name: 'shrugs3',
  //       description: 'shrugs test',
  //       series: '4',
  //       reps: '10',
  //       weight: '10'
  //     }
  //   ])
  // ];

  getTrainingPlans() {
    return this.trainingPlans.slice();
  }
  getTrainingPlan(index: number) {
    return this.trainingPlans[index];
  }
  setTrainingPlans(trainingPlans: TrainingPlan[]) {
    this.trainingPlans = trainingPlans;
  }
  setTrainingPlan(index: number, trainingPlan: TrainingPlan) {
    this.trainingPlans[index] = trainingPlan;
    this.trainingPlansChanged.next(this.trainingPlans.slice());
  }
  addTraining(trainingPlan: TrainingPlan) {
    this.trainingPlans.push(trainingPlan);
    // console.log(this.trainingPlans);

    this.trainingPlansChanged.next(this.trainingPlans.slice());
  }
  deleteTraining(index: number) {
    this.trainingPlans.splice(index, 1);
    // console.log('delete training');
    this.trainingPlansChanged.next(this.trainingPlans.slice());
  }

}
