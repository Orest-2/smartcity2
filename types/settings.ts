
export interface Question {
  title: string;
  score: number;
}
export interface Criterion {
  title: string;
  desiredValues: number;
  questions: Question[];
}

export interface Model {
  title: string;
  type: string;
  active: boolean;
  criteria: Criterion[];
}
