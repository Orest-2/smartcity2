import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { harmonicSpline } from '~/constants/membership-functions'
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

    const m = inData.map(data => data.specialistScoreSum.map(s => harmonicSpline(s, data.a, data.b)))

    console.log(m)
  }
}
