export interface IntermediateFuzzyModelResult {
  m: number[];
  q: number;
  w: number;
  readonly z: number[];
  readonly zw: number[];
}

export interface Result {
  fuzzyModel: {
    intermediateResults: IntermediateFuzzyModelResult[],
    result: number[]
  },
  hybridFuzzyModel: {
    result: number[]
  },
  neuroFuzzyNetwork: {
    intermediateResults: [],
    result: []
  }
}
