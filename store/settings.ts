import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/types/store'

export const state = () => ({
  things: [] as string[],
  name: 'Me'
})

export type SettingsState = ReturnType<typeof state>

export const getters: GetterTree<SettingsState, RootState> = {
  name: state => state.name
}

export const mutations: MutationTree<SettingsState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName)
}

export const actions: ActionTree<SettingsState, RootState> = {

}
