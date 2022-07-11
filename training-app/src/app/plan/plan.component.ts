import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
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
  isUpdate = false;
  trainingPlans: TrainingPlan[];
  newPlanForm: FormGroup;
  tPlansSub: Subscription;
  constructor (private planServeice: PlanService) { }

  ngOnInit(): void {
    this.trainingPlans = this.planServeice.getTrainingPlans();
    // console.log(this.trainingPlans[0]);
    this.tPlansSub = this.planServeice.trainingPlansChanged.subscribe((plans: TrainingPlan[]) => {
      this.trainingPlans = plans;
    });
    this.initForm();

  }
  private initForm() {
    let trainingName = null;
    let exercises = new UntypedFormArray([]);

    console.log(exercises);

    // this.newPlanForm = new FormGroup({
    //   'trainingName': new FormControl(trainingName, Validators.required),
    //   'exercises': exercises
    // });
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  onAddTraining() {
    const newTraining = new TrainingPlan(
      this.newPlanForm.value['trainingName'],
      this.newPlanForm.value['exercises']
    );

    // console.log(newTraining);

    this.planServeice.addTraining(newTraining);

  }
  onAddExercise() {
    (<UntypedFormArray>this.newPlanForm.get('exercises')).push(
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
    let trainingPlan = this.planServeice.getTrainingPlan(index);
    let exercises: any[] = [];
    if (trainingPlan['exercises']) {
      for (let exercise of trainingPlan['exercises']) {
        console.log('test');
        exercises.push(
          new FormGroup({
            'name': new FormControl(exercise.name),
            'series': new FormControl(exercise.series),
            'reps': new FormControl(exercise.reps),
            'weight': new FormControl(exercise.weight),
            'description': new FormControl(exercise.description)!
          })
        );
      }
      this.newPlanForm.patchValue({
        trainingName: trainingPlan.trainingName,
        exercises: exercises
      });
    }
  }
  onDeleteExercise(index: number) {
    (<UntypedFormArray>this.newPlanForm.get('exercises')).removeAt(index);
  }
  get controls() {
    return (<UntypedFormArray>this.newPlanForm.get('exercises')).controls;
  }
  onDelete(index: number) {
    this.planServeice.deleteTraining(index);
  }
  ngOnDestroy(): void {
    this.tPlansSub.unsubscribe();
  }
}
