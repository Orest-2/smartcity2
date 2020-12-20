import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { harmonicSpline, squareSpline } from '~/constants/membership-functions'
import { Result } from '~/types/calculator'
import { RootState } from '~/types/store'

export const state = () => ({
  result: {
    fuzzyModel: {
      intermediateResults: [],
      result: []
    },
    hybridFuzzyModel: {
      result: []
    },
    neuroFuzzyNetwork: {
      intermediateResults: [],
      result: []
    }
  } as Result
})

export type CalculatorState = ReturnType<typeof state>

export const getters: GetterTree<CalculatorState, RootState> = {}

export const mutations: MutationTree<CalculatorState> = {
  SET_RESULT (s, res) {
    s.result = res
  }
}

export const actions: ActionTree<CalculatorState, RootState> = {
  calculate ({ rootState, commit }) {
    const inData = rootState.home.data
    const evaluationModel = rootState.home.evaluationModel
    const sn = rootState.home.specialistN

    const res: Result = {
      fuzzyModel: {
        intermediateResults: [],
        result: []
      },
      hybridFuzzyModel: {
        result: []
      },
      neuroFuzzyNetwork: {
        intermediateResults: [],
        result: []
      }
    }

    if (evaluationModel === 'M1' || evaluationModel === 'M2') {
      const intermediateFuzzyModelRes = inData.map((data) => {
        const { a, b, criteriaDesiredValueSum, modelDesiredValue, w } = data

        return {
          m: data.specialistScoreSum.map(s => harmonicSpline(s, a, b)),
          q: modelDesiredValue || squareSpline(criteriaDesiredValueSum, a, b),
          w,
          get z () {
            return this.m.map((el) => {
              const f = Math.abs(this.q - el)
              const minEl = Math.min(...this.m)
              const maxEl = Math.max(...this.m)
              const s = Math.max(this.q - minEl, maxEl - this.q)

              return 1 - f / s
            })
          },
          get zw () {
            return this.z.map(z => z * this.w)
          }
        }
      })

      const initRes = Array<number>(sn).fill(0)

      const fuzzyModelRes = intermediateFuzzyModelRes.reduce((res, el) => {
        const sum = el.zw.map((zw, i) => zw + res[i])
        return sum
      }, initRes)

      res.fuzzyModel.intermediateResults = intermediateFuzzyModelRes
      res.fuzzyModel.result = fuzzyModelRes
    }

    // if (evaluationModel === 'M2') {

    // }

    commit('SET_RESULT', res)

    // console.log(res)

    return Promise.resolve(res)
  }
}
