import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { harmonicSpline, squareSpline } from '~/constants/membership-functions'
import { RootState } from '~/types/store'

export const state = () => ({
  result: []
})

export type CalculatorState = ReturnType<typeof state>

export const getters: GetterTree<CalculatorState, RootState> = {}

export const mutations: MutationTree<CalculatorState> = {}

export const actions: ActionTree<CalculatorState, RootState> = {
  calculate ({ rootState }) {
    const inData = rootState.home.data

    const r = inData.map((data) => {
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
        }
      }
    })

    console.log(r)
  }
}
