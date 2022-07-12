import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TrainingPlan, Exercise } from "../shared/trainingPlan.model";

@Injectable({ providedIn: 'root' })
export class PlanService {
  trainingPlansChanged = new Subject<TrainingPlan[]>();

  private trainingPlans: TrainingPlan[] = [
    new TrainingPlan('Training A', [
      {
        name: 'ohp',
        description: 'test',
        series: '3',
        reps: '12',
        weight: '20'
      },
      {
        name: 'shrugs',
        description: 'shrugs test',
        series: '4',
        reps: '10',
        weight: '10'
      }
    ]),
    new TrainingPlan('Training B', [
      {
        name: 'shrugs1',
        description: 'shrugs test',
        series: '4',
        reps: '10',
        weight: '10'
      },
      {
        name: 'shrugs2',
        description: 'shrugs test',
        series: '4',
        reps: '10',
        weight: '10'
      },
      {
        name: 'shrugs3',
        description: 'shrugs test',
        series: '4',
        reps: '10',
        weight: '10'
      }
    ])
  ];

  getTrainingPlans() {
    return this.trainingPlans.slice();
  }
  getTrainingPlan(index: number) {
    return this.trainingPlans[index];
  }
  addTraining(trainingPlan: TrainingPlan) {
    this.trainingPlans.push(trainingPlan);
    console.log(this.trainingPlans);

    this.trainingPlansChanged.next(this.trainingPlans.slice());
  }
  updateExercise() {

  }
  deleteTraining(index: number) {
    this.trainingPlans.splice(index, 1);
    console.log('delete training');
    this.trainingPlansChanged.next(this.trainingPlans.slice());
  }
}
