import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { TrainingPlan } from '../shared/trainingPlan.model';
import { PlanEditComponent } from './plan-edit/plan-edit.component';
import { PlanService } from './plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit, OnDestroy {
  editMode = false;
  isUpdate = false;
  editedTraining: number;
  trainingPlans: TrainingPlan[];
  tPlansSub: Subscription;
  constructor (private planServeice: PlanService,
    private dataStorageService: DataStorageService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.trainingPlans = this.planServeice.getTrainingPlans();
    this.tPlansSub = this.planServeice.trainingPlansChanged.subscribe((plans: TrainingPlan[]) => {
      console.log('plan test init');

      this.trainingPlans = plans;
    });
    this.planServeice.isUpdating.subscribe(update => {
      this.isUpdate = update.mode;
    });

    this.onFetch();
  }

  // openDialog() {
  //   this.dialog.open(null);
  // }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onFetch() {
    this.dataStorageService.fetchData().subscribe();
  }

  openDialog(index?: number) {
    let trainingPlan = new TrainingPlan('', []);
    // console.log(index);
    // console.log(index);

    if (index == undefined) {
      //  ...
    } else {
      this.planServeice.isUpdating.next({ mode: true, index: index });
      trainingPlan = this.planServeice.getTrainingPlan(index);
      this.editedTraining = index;
      console.log(trainingPlan);

    }
    // let trainingPlan = this.planServeice.getTrainingPlan(index);

    // this.planServeice.trainingPlanEdited.next(new TrainingPlan(trainingPlan.trainingName, trainingPlan.exercises));
    // this.openDialog();
    this.dialog.open(PlanEditComponent, {
      data: trainingPlan
    });
    // this.planServeice.updatingTrainin(index);
    // console.log(trainingPlan);

  }
  onDeleteExercise(index: number) {
  }

  onDelete(index: number) {
    this.planServeice.deleteTraining(index);
    this.dataStorageService.storeData();
  }

  ngOnDestroy(): void {
    this.tPlansSub.unsubscribe();
  }
}
