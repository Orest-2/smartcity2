export interface IntermediateFuzzyModelResult {
  m: number[];
  q: number;
  w: number;
  readonly z: number[];
  readonly zw: number[];
}

export interface IntermediateNeuroFuzzyNetworkResult {
  O: number[][];
  mO: number[][];
  Z: number[];
  W: number[];
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
    intermediateResults: IntermediateNeuroFuzzyNetworkResult[],
    result: number[]
  }
}
