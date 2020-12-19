import Vue from 'vue'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { homeDataMock } from '~/mocks/home'
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
  mockData ({ commit, dispatch }) {
    commit('SET_SPECIALIST_N', 7)
    dispatch('initData', { mock: true })
  },

  setSpecialistN ({ commit, dispatch }, { n }) {
    commit('SET_SPECIALIST_N', n)
    dispatch('initData')
  },

  initData ({ rootGetters, state, commit }, { mock } = {}) {
    const models: Model[] = rootGetters['settings/getActiveModels']

    const res = models.map<ModelData>(
      (el, i) => {
        const getSumOf = (func: (...values: number[]) => number) => {
          const scores = el.criteria.map(c => c.answers.map(a => a.score))
          return scores.reduce((a, s) => {
            a += func(...s)
            return a
          }, 0)
        }

        return {
          modelDesiredValue: el.desiredValue,
          data: el.criteria.map<CriterionData>(
            (el, j) => {
              return {
                desiredValue: el.desiredValue,
                data: mock ? homeDataMock[i].data[j].data : Array(state.specialistN).fill(0),
                get min () {
                  return Math.min(...this.data)
                },
                get max () {
                  return Math.max(...this.data)
                }
              }
            }
          ),
          get a () {
            if (el.type === 'tests') { return getSumOf(Math.min) }

            return Math.min(...this.data.map(d => d.min)) * el.criteria.length
          },
          get b () {
            if (el.type === 'tests') { return getSumOf(Math.max) }

            return Math.max(...this.data.map(d => d.max)) * el.criteria.length
          },
          get specialistScoreSum () {
            const initRes = Array<number>(state.specialistN).fill(0)

            const resSum = this.data.reduce((sum, c) => {
              const d = sum.map((n, i) => n + c.data[i])
              return d
            }, initRes)

            return resSum
          },
          get criteriaDesiredValueSum () {
            const sum = this.data.reduce((r, e) => r + e.desiredValue, 0)
            return sum
          },
          get w () {
            const s = models.reduce((a, b) => a + b.weightingFactor, 0)
            return el.weightingFactor / s
          }
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
