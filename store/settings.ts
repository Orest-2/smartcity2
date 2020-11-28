import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/types/store'
import { Model } from '~/types/settings'

export const state = () => ({
  models: [] as Model[]
})

export type SettingsState = ReturnType<typeof state>

export const getters: GetterTree<SettingsState, RootState> = {
}

export const mutations: MutationTree<SettingsState> = {
}

export const actions: ActionTree<SettingsState, RootState> = {
}
