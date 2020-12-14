import Vue from 'vue'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { CriterionData, ModelData } from '~/types/home'
import { Model } from '~/types/settings'
import { RootState } from '~/types/store'

export const state = () => ({
  specialistN: 6,
  data: [] as ModelData[]
})

export type HomeState = ReturnType<typeof state>

export const getters: GetterTree<HomeState, RootState> = {
  getSpecialistData (s) {
    return ({ mi, ci, si }: {mi:number, ci:number, si:number}) => s.data[mi].data[ci].data[si]
  }
}

export const mutations: MutationTree<HomeState> = {
  SET_SPECIALIST_N (state, n) {
    state.specialistN = n
  },

  INIT_DATA (s, data) {
    s.data = data
  },

  SET_DATA (s, { mi, ci, si, v }) {
    Vue.set(s.data[mi].data[ci].data, si, v)
  }
}

export const actions: ActionTree<HomeState, RootState> = {
  setSpecialistN ({ commit, dispatch }, { n }) {
    commit('SET_SPECIALIST_N', n)
    dispatch('initData')
  },

  initData ({ rootGetters, state, commit }) {
    const models: Model[] = rootGetters['settings/getActiveModels']

    const res = models.map<ModelData>(
      (el) => {
        return {
          data: el.criteria.map<CriterionData>(
            el => (
              {
                desiredValue: el.desiredValue,
                data: Array(state.specialistN).fill(0)
              }
            )
          )
        }
      }
    )

    commit('INIT_DATA', res)
  },

  setData ({ commit }, { modelIndex, criterionIndex, specialistIndex, value }) {
    commit('SET_DATA', {
      mi: modelIndex,
      ci: criterionIndex,
      si: specialistIndex,
      v: value
    })
  }
}
