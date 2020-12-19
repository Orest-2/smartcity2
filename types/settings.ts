
export interface Answer {
  title: string;
  score: number;
}
export interface Criterion {
  title: string;
  desiredValue: number;
  answers: Answer[];
}

export type ModelTypes = 'tests' | 'values'
export interface Model {
  title: string;
  type: ModelTypes;
  active: boolean;
  desiredValue: number;
  weightingFactor: number;
  criteria: Criterion[];
}
