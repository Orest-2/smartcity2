export interface CriterionData {
  desiredValue: number
  data: number[]
  l: number[]
  readonly min: number
  readonly max: number
}

export interface ModelData {
  data: CriterionData[]
  modelDesiredValue: number
  readonly a: number
  readonly b: number
  readonly specialistScoreSum: number[]
  readonly criteriaDesiredValueSum: number
  readonly w: number
}

export interface DataM2 {
  specialistIndex: number,
  specialistName: string,
  m1Value: number,
  k: number;
}
