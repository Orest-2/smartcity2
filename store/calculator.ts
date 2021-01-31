import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { harmonicSpline, squareSpline } from '~/constants/membership-functions'
import { Result } from '~/types/calculator'
import { DataM2 } from '~/types/home'
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
  calculate ({ state, rootState, commit }) {
    const evaluationModel = rootState.home.evaluationModel
    const sn = rootState.home.specialistN

    const res: Result = {
      ...JSON.parse(JSON.stringify(state.result))
    }

    if (evaluationModel === 'M1') {
      const inData = rootState.home.data

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

    if (evaluationModel === 'M2') {
      const inDataM2 = rootState.home.dataM2

      const calcFunc = (el: DataM2) => {
        const P = el.m1Value * 100

        if (P < 0) {
          return 0
        }

        if (P > 100) {
          return 1
        }

        return Math.pow(el.m1Value, el.k)
      }

      res.fuzzyModel.result = inDataM2.map(el => Number(el.m1Value))
      res.hybridFuzzyModel.result = inDataM2.map(el => calcFunc(el))
    }

    if (evaluationModel === 'M3') {
      const inDataM3 = rootState.home.data.map(d => d.W)

      res.neuroFuzzyNetwork.result = inDataM3.slice(1).reduce((s, w) => {
        return s.map((s, i) => s + w[i])
      }, inDataM3[0])
    }

    commit('SET_RESULT', res)

    // console.log(res)

    return Promise.resolve(res)
  }
}
