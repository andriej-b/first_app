import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { TrainingPlan } from '../shared/trainingPlan.model';
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
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    // console.log(this.dataStorageService.fetchData());
    this.trainingPlans = this.planServeice.getTrainingPlans();
    // console.log(this.trainingPlans[0]);
    this.tPlansSub = this.planServeice.trainingPlansChanged.subscribe((plans: TrainingPlan[]) => {
      this.trainingPlans = plans;
    });
    this.initForm();
    this.onFetch();
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
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  onAddTraining() {

    const newTraining = new TrainingPlan(
      this.newPlanForm.value['trainingName'],
      this.newPlanForm.value['exercises']
    );

    if (this.isUpdate) {
      this.onDelete(this.editedTraining);
    }
    this.planServeice.addTraining(newTraining);
    this.dataStorageService.storeData();
    this.isUpdate = false;
    this.editedTraining = null;
    this.onCancel();

  }
  onFetch() {
    this.dataStorageService.fetchData().subscribe();
  }
  onAddExercise() {
    (<FormArray>this.newPlanForm.get('exercises')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'series': new FormControl(null, Validators.required),
        'reps': new FormControl(null, Validators.required),
        'weight': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
      })
    );
  }
  onUpdateTraining(index: number) {
    this.isUpdate = true;
    this.editedTraining = index;
    let trainingPlan = this.planServeice.getTrainingPlan(index);
    let exercises = new FormArray([]);
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
    (<FormArray>this.newPlanForm.get('exercises')).removeAt(index);
  }
  get controls() {
    return (<FormArray>this.newPlanForm.get('exercises')).controls;
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
