
export interface Answer {
  title: string;
  score: number;
}
export interface Criterion {
  title: string;
  desiredValue: number;
  synapticWeight: number;
  answers: Answer[];
}

export type ModelTypes = 'tests' | 'values' | 'group_criteria'
export interface Model {
  title: string;
  type: ModelTypes;
  active: boolean;
  desiredValue: number;
  weightingFactor: number;
  synapticWeight: number;
  criteria: Criterion[];
}

export interface LinguisticVariableM2 {
  title: string;
  k: number;
}

export interface LinguisticVariableM3 {
  title: string;
  a1: number;
  a2: number;
}

export interface SynapticWeightM3 {
  title: string;
  a: number;
}

export interface Algorithm {
  M2: {
    linguisticVariables: LinguisticVariableM2[]
  },
  M3: {
    linguisticVariables: LinguisticVariableM3[]
    synapticWeights: SynapticWeightM3[]
    originalVariableY: LinguisticVariableM3[]
  }
}
