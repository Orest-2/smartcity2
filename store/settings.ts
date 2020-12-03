import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/types/store'
import { Model } from '~/types/settings'

const tests: Model[] = [
  {
    active: true,
    type: 'tests',
    title: 'M1',
    criteria: []
  },
  {
    active: true,
    type: 'values',
    title: 'M2',
    criteria: []
  },
  {
    active: true,
    type: 'values',
    title: 'M3',
    criteria: []
  },
  {
    active: true,
    type: 'values',
    title: 'M4',
    criteria: []
  }
]

export const state = () => ({
  models: [...tests] as Model[]
})

export type SettingsState = ReturnType<typeof state>

export const getters: GetterTree<SettingsState, RootState> = {
}

export const mutations: MutationTree<SettingsState> = {
  UPDATE_MODEL (state, { i, k, v }) {
    state.models[i] = {
      ...state.models[i],
      [k]: v
    }
  }
}

export const actions: ActionTree<SettingsState, RootState> = {
  updateModel ({ commit }, { index, key, value }) {
    commit('UPDATE_MODEL', { i: index, k: key, v: value })
  }
}
