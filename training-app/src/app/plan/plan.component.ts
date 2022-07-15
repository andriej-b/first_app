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
  newPlanForm: FormGroup;
  tPlansSub: Subscription;
  constructor (private planServeice: PlanService,
    private dataStorageService: DataStorageService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // console.log(this.dataStorageService.fetchData());
    this.trainingPlans = this.planServeice.getTrainingPlans();
    // console.log(this.trainingPlans[0]);
    this.tPlansSub = this.planServeice.trainingPlansChanged.subscribe((plans: TrainingPlan[]) => {
      console.log('plan test init');

      this.trainingPlans = plans;
    });
    this.initForm();
    this.onFetch();
  }
  get controls() {
    return (<FormArray>this.newPlanForm.get('exercises')).controls;
  }
  private initForm() {
    let trainingName = null;
    let exercises = new FormArray([]);

    // console.log(exercises);

    this.newPlanForm = new FormGroup({
      'trainingName': new FormControl(trainingName, Validators.required),
      'exercises': exercises
    });
  }
  openDialog() {
    this.dialog.open(PlanEditComponent);
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  // onAddTraining() {

  //   const newTraining = new TrainingPlan(
  //     this.newPlanForm.value['trainingName'],
  //     this.newPlanForm.value['exercises']
  //   );

  //   if (this.isUpdate) {
  //     this.onDelete(this.editedTraining);
  //   }
  //   this.planServeice.addTraining(newTraining);
  //   this.dataStorageService.storeData();
  //   this.isUpdate = false;
  //   this.editedTraining = null;
  //   this.onCancel();

  // }
  onFetch() {
    this.dataStorageService.fetchData().subscribe();
  }
  // onAddExercise() {

  // }
  onUpdateTraining(index: number) {
    this.isUpdate = true;
    this.editedTraining = index;
    let trainingPlan = this.planServeice.getTrainingPlan(index);
    let exercises = new FormArray([]);
    this.openDialog();
    if (trainingPlan['exercises']) {
      for (let exercise of trainingPlan['exercises']) {
        console.log('test');
        (<FormArray>this.newPlanForm.get('exercises')).push(
          new FormGroup({
            'name': new FormControl(exercise.name),
            'series': new FormControl(exercise.series),
            'reps': new FormControl(exercise.reps),
            'weight': new FormControl(exercise.weight),
            'description': new FormControl(exercise.description)
          })
        );
      }
      this.newPlanForm.setValue({
        trainingName: trainingPlan.trainingName,
        exercises: exercises
      });
    }
  }
  onDeleteExercise(index: number) {
  }

  onDelete(index: number) {
    this.planServeice.deleteTraining(index);
    this.dataStorageService.storeData();
  }
  onCancel() {
    this.newPlanForm.reset();
    (<FormArray>this.newPlanForm.get('exercises')).clear();
  }
  ngOnDestroy(): void {
    this.tPlansSub.unsubscribe();
  }
}
