export interface Exercise {
  name: string;
  description: string;
  series: number;
  reps: number;
  weight: number;
}

export class TrainingPlan {
  constructor (public trainingName: string, public exercises: Exercise[]) { };
}
