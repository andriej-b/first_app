import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  updateMode: boolean;
  editedIndex: number;
  constructor (private planService: PlanService,
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: TrainingPlan | null) { }

  ngOnInit(): void {
    this.planService.isUpdating.subscribe(update => {
      this.updateMode = update.mode;
      this.editedIndex = update.index;
    });
    this.initForm();
  }

  onAddTraining() {
    const newTraining = new TrainingPlan(
      this.newPlanForm.value['trainingName'],
      this.newPlanForm.value['exercises']
    );
    if (this.updateMode) {
      console.log(this.editedIndex);

      this.planService.setTrainingPlan(this.editedIndex, newTraining);
    } else {
      this.planService.addTraining(newTraining);
    }

    this.dataStorageService.storeData();
  }
  private initForm() {

    this.planService.trainingPlanEdited.subscribe(formData => {
      console.log(formData);

    });
    if (this.data == null) {
      let trainingName = null;
      let exercises = new FormArray([]);
      this.newPlanForm = new FormGroup({
        'trainingName': new FormControl(trainingName, Validators.required),
        'exercises': exercises
      });
    } else {
      let trainingName = this.data.trainingName;
      let exercises = new FormArray([]);
      for (let exercise of this.data.exercises) {
        exercises.push(
          new FormGroup({
            name: new FormControl(exercise.name),
            series: new FormControl(exercise.series),
            reps: new FormControl(exercise.reps),
            weight: new FormControl(exercise.weight),
            description: new FormControl(exercise.description)
          })
        );
      }

      this.newPlanForm = new FormGroup({
        'trainingName': new FormControl(trainingName, Validators.required),
        'exercises': exercises
      });
    }
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
        'description': new FormControl(null),
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
