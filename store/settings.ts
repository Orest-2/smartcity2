import Vue from 'vue'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/types/store'
import { Algorithm, Answer, Criterion, Model } from '~/types/settings'

import { algorithms, mock } from '~/mocks/settings'

export const state = () => ({
  models: [...mock] as Model[],
  algorithms: { ...algorithms } as Algorithm
})

export type SettingsState = ReturnType<typeof state>

export const getters: GetterTree<SettingsState, RootState> = {
  getActiveModels (state) {
    return state.models.filter(m => m.active)
  },

  getModel (s) {
    return (mi: number) => s.models[mi]
  }
}

export const mutations: MutationTree<SettingsState> = {
  ADD_MODEL (state, model) {
    state.models.push(model)
  },

  UPDATE_MODEL (state, { i, k, v }) {
    Vue.set(state.models, i,
      {
        ...state.models[i],
        [k]: v
      }
    )
  },

  REMOVE_MODEL (state, { i }) {
    state.models.splice(i, 1)
  },

  ADD_CRITERION (state, { mi, c }) {
    state.models[mi].criteria.push(c)
  },

  UPDATE_CRITERION (state, { mi, ci, k, v }) {
    Vue.set(state.models[mi].criteria, ci,
      {
        ...state.models[mi].criteria[ci],
        [k]: v
      }
    )
  },

  REMOVE_CRITERION (state, { mi, ci }) {
    state.models[mi].criteria.splice(ci, 1)
  },

  ADD_ANSWER (state, { mi, ci, a }) {
    state.models[mi].criteria[ci].answers.push(a)
  },

  UPDATE_ANSWER (state, { mi, ci, ai, k, v }) {
    Vue.set(state.models[mi].criteria[ci].answers, ai,
      {
        ...state.models[mi].criteria[ci].answers[ai],
        [k]: v
      }
    )
  },

  REMOVE_ANSWER (state, { mi, ci, ai }) {
    state.models[mi].criteria[ci].answers.splice(ai, 1)
  },

  UPDATE_ALGORITHM (state, { a, s, i, k, v }) {
    const ak = a as 'M2' | 'M3'

    if (ak === 'M2') {
      type Sk = keyof Algorithm['M2']
      const sk = s as Sk

      Vue.set(state.algorithms[ak][sk], i,
        {
          ...state.algorithms[ak][sk][i],
          [k]: v
        }
      )
    }

    if (ak === 'M3') {
      type Sk = keyof Algorithm['M3']
      const sk = s as Sk

      Vue.set(state.algorithms[ak][sk], i,
        {
          ...state.algorithms[ak][sk][i] as {},
          [k]: v
        }
      )
    }
  }

}

export const actions: ActionTree<SettingsState, RootState> = {
  addModel ({ commit }, { model }) {
    commit('ADD_MODEL', model)
  },

  updateModel ({ commit }, { index, key, value }) {
    commit('UPDATE_MODEL', {
      i: index,
      k: key,
      v: value
    })
  },

  removeModel ({ commit }, { index }) {
    commit('REMOVE_MODEL', { i: index })
  },

  addCriterion ({ commit }, { modelIndex, criterion }) {
    const c: Criterion = {
      answers: [],
      title: '',
      desiredValue: 0,
      ...criterion
    }
    commit('ADD_CRITERION', { mi: modelIndex, c })
  },

  updateCriterion ({ commit }, { modelIndex, criterionIndex, key, value }) {
    commit('UPDATE_CRITERION', {
      mi: modelIndex,
      ci: criterionIndex,
      k: key,
      v: value
    })
  },

  removeCriterion ({ commit }, { modelIndex, criterionIndex }) {
    commit('REMOVE_CRITERION', {
      mi: modelIndex,
      ci: criterionIndex
    })
  },

  addAnswer ({ commit }, { modelIndex, criterionIndex, answer }) {
    const a: Answer = {
      title: '',
      score: 0,
      ...answer
    }
    commit('ADD_ANSWER', {
      mi: modelIndex,
      ci: criterionIndex,
      a
    })
  },

  updateAnswer ({ commit }, { modelIndex, criterionIndex, answerIndex, key, value }) {
    commit('UPDATE_ANSWER', {
      mi: modelIndex,
      ci: criterionIndex,
      ai: answerIndex,
      k: key,
      v: value
    })
  },

  removeAnswer ({ commit }, { modelIndex, criterionIndex, answerIndex }) {
    commit('REMOVE_ANSWER', {
      mi: modelIndex,
      ci: criterionIndex,
      ai: answerIndex
    })
  },

  updateAlgorithm ({ commit }, { algorithm, set, index, key, value }) {
    commit('UPDATE_ALGORITHM', {
      a: algorithm,
      s: set,
      i: index,
      k: key,
      v: value
    })
  }
}
