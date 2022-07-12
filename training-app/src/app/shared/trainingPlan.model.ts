export interface Exercise {
  name: string;
  description: string;
  series: string;
  reps: string;
  weight: string;
}

export class TrainingPlan {
  constructor (public trainingName: string, public exercises: Exercise[]) { };
}
