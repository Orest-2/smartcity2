import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/types/store'
import { Answer, Criterion, Model } from '~/types/settings'

const tests: Model[] = [
  {
    active: true,
    type: 'tests',
    title: 'M1',
    criteria: [
      {
        title: 'Коли між людьми відбувається конфлікт на ґрунті ідей, я віддаю перевагу тій стороні, що:',
        desiredValue: 0,
        answers: [
          { score: 5, title: 'Приймає, визнає конфлікт і намагається висловити його відкрито (5 балів)' },
          { score: 10, title: 'Більше за інших зачіпає мої власні цінності та ідеали (10 балів)' },
          { score: 15, title: 'Краще за інших відображає мої особисті погляди і досвід (15 балів)' },
          { score: 25, title: 'Пасує до ситуації найбільш логічної і послідовної (25 балів)' },
          { score: 30, title: 'Викладає аргументи найбільш коротко і переконливо (30 балів)' }
        ]
      },
      {
        title: 'Коли я починаю працювати над проектом у складі групи, найважливіше для мене:',
        desiredValue: 0,
        answers: [
          { score: 5, title: 'Зрозуміти мету і значення цього проекту (5 балів)' },
          { score: 10, title: 'Розкрити мету і цінності учасників робочої групи (10 балів)' },
          { score: 15, title: 'Визначити, як ми збираємося розробляти даний проект (15 балів)' },
          { score: 25, title: 'Зрозуміти, яку користь цей проект може принести для нашої групи (20 балів)' },
          { score: 30, title: 'Щоб робота над проектом була організована і зрушила з місця (30 балів)' }
        ]
      }
    ]
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
  ADD_MODEL (state, model) {
    state.models.push(model)
  },

  UPDATE_MODEL (state, { i, k, v }) {
    state.models[i] = {
      ...state.models[i],
      [k]: v
    }
  },

  REMOVE_MODEL (state, { i }) {
    state.models.splice(i, 1)
  },

  ADD_CRITERION (state, { mi, c }) {
    state.models[mi].criteria.push(c)
  },

  UPDATE_CRITERION (state, { mi, ci, k, v }) {
    state.models[mi].criteria[ci] = {
      ...state.models[mi].criteria[ci],
      [k]: v
    }
  },

  REMOVE_CRITERION (state, { mi, ci }) {
    state.models[mi].criteria.splice(ci, 1)
  },

  ADD_ANSWER (state, { mi, ci, a }) {
    state.models[mi].criteria[ci].answers.push(a)
  },

  UPDATE_ANSWER (state, { mi, ci, ai, k, v }) {
    state.models[mi].criteria[ci].answers[ai] = {
      ...state.models[mi].criteria[ci].answers[ai],
      [k]: v
    }
  },

  REMOVE_ANSWER (state, { mi, ci, ai }) {
    state.models[mi].criteria[ci].answers.splice(ai, 1)
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
  }
}
