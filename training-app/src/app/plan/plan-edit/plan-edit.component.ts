import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { TrainingPlan } from 'src/app/shared/trainingPlan.model';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.css']
})
export class PlanEditComponent implements OnInit {
  newPlanForm: FormGroup;
  constructor (private planService: PlanService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onAddTraining() {
    const newTraining = new TrainingPlan(
      this.newPlanForm.value['trainingName'],
      this.newPlanForm.value['exercises']
    );

    this.planService.addTraining(newTraining);
    this.dataStorageService.storeData();
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
  get controls() {
    return (<FormArray>this.newPlanForm.get('exercises')).controls;
  }
  onAddExercise() {
    (<FormArray>this.newPlanForm.get('exercises')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'series': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
        'reps': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
        'weight': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
        'description': new FormControl(null, Validators.required),
      })
    );
  }
  onDeleteExercise(index: number) {
    (<FormArray>this.newPlanForm.get('exercises')).removeAt(index);

  }
  onCancel() {
    this.newPlanForm.reset();
    (<FormArray>this.newPlanForm.get('exercises')).clear();
  }
}
