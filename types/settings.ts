
export interface Answers {
  title: string;
  score: number;
}
export interface Criterion {
  title: string;
  desiredValue: number;
  answers: Answers[];
}

export type ModelTypes = 'tests' | 'values'
export interface Model {
  title: string;
  type: ModelTypes;
  active: boolean;
  criteria: Criterion[];
}
