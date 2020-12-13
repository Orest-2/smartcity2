import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/types/store'

export const state = () => ({
  specialistN: 6
})

export type HomeState = ReturnType<typeof state>

export const getters: GetterTree<HomeState, RootState> = {
}

export const mutations: MutationTree<HomeState> = {
  SET_SPECIALIST_N (state, n) {
    state.specialistN = n
  }
}

export const actions: ActionTree<HomeState, RootState> = {
  setSpecialistN ({ commit }, { n }) {
    commit('SET_SPECIALIST_N', n)
  }
}
