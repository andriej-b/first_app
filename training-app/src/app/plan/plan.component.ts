import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { TrainingPlan } from '../shared/trainingPlan.model';
import { PlanEditComponent } from './plan-edit/plan-edit.component';
import { PlanService } from './plan.service';

import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';


interface Message {
  message: string;
}
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

  message: string = null;

  constructor (private planServeice: PlanService,
    private dataStorageService: DataStorageService,
    public dialog: MatDialog,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.trainingPlans = this.planServeice.getTrainingPlans();
    this.tPlansSub = this.planServeice.trainingPlansChanged.subscribe((plans: TrainingPlan[]) => {

      this.trainingPlans = plans;
    });
    this.planServeice.isUpdating.subscribe(update => {
      this.isUpdate = update.mode;
    });

    this.onFetch();
  }

  callApi(): void {
    this.http.get(`${env.dev.serverUrl}/api/messages/protected-message`)
      .subscribe((result) => {
        console.log(result);

      });
  }
  callSecureApi(): void {
    this.http.get(`${env.dev.serverUrl}/api/plans/getPlans`)
      .subscribe((result) => {
        console.log(result);
      });
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onFetch() {
    this.dataStorageService.fetchData().subscribe(result => {
      // console.log(result);

    });
  }

  openDialog(index?: number) {
    let trainingPlan = new TrainingPlan('', []);


    if (index == undefined) {
      //  ...
    } else {
      this.planServeice.isUpdating.next({ mode: true, index: index });
      trainingPlan = this.planServeice.getTrainingPlan(index);
      this.editedTraining = index;


    }

    this.dialog.open(PlanEditComponent, {
      data: trainingPlan
    });

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
