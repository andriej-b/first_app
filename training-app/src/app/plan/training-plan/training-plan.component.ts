import { Component, Input, OnInit } from '@angular/core';
import { TrainingPlan } from 'src/app/shared/trainingPlan.model';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-training-plan',
  templateUrl: './training-plan.component.html',
  styleUrls: ['./training-plan.component.css']
})
export class TrainingPlanComponent implements OnInit {
  trainingPlan: TrainingPlan;
  displayedColumns = ['name', 'series', 'reps', 'weight', 'description'];
  dataSource = [];
  @Input() trainingIndex: number;
  constructor (private planService: PlanService) { }

  ngOnInit(): void {
    this.trainingPlan = this.planService.getTrainingPlan(this.trainingIndex);
    this.dataSource = [...this.trainingPlan.exercises];
    // console.log(this.trainingPlan);

  }

}
