import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingPlan } from '../shared/trainingPlan.model';
import { PlanService } from './plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit, OnDestroy {
  editMode = false;
  trainingPlans: TrainingPlan[];
  tPlansSub: Subscription;
  constructor (private planServeice: PlanService) { }

  ngOnInit(): void {
    this.trainingPlans = this.planServeice.getTrainingPlans();
    // console.log(this.trainingPlans[0]);
    this.tPlansSub = this.planServeice.trainingPlansChanged.subscribe((plans: TrainingPlan[]) => {
      this.trainingPlans = plans;
    });

  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  onAddTraining() {
    console.log('add');

  }
  onDelete(index: number) {
    this.planServeice.deleteTraining(index);
  }
  ngOnDestroy(): void {
    this.tPlansSub.unsubscribe();
  }
}
