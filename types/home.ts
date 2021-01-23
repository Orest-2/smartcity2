import { LinguisticVariableM3 } from './settings'

export interface CriterionData {
  desiredValue: number
  synapticWeight: number
  data: number[]
  l: LinguisticVariableM3[]
  readonly min: number
  readonly max: number
  readonly O: number[]
  readonly mO: number[]
}

export interface ModelData {
  data: CriterionData[]
  modelDesiredValue: number
  synapticWeight: number
  readonly a: number
  readonly b: number
  readonly specialistScoreSum: number[]
  readonly criteriaDesiredValueSum: number
  readonly w: number
  readonly Z: number[]
  readonly W: number[]
}

export interface DataM2 {
  specialistIndex: number,
  specialistName: string,
  m1Value: number,
  k: number;
}
