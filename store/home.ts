import Vue from 'vue'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { linearSshaped } from '~/constants/membership-functions'
import { homeDataMock } from '~/mocks/home'
import { CriterionData, DataM2, ModelData } from '~/types/home'
import { Model } from '~/types/settings'
import { RootState } from '~/types/store'

export const state = () => ({
  specialistN: 0,
  evaluationModel: 'M1' as 'M1' | 'M2' | 'M3',
  data: [] as ModelData[],
  dataM2: [] as DataM2[]
})

export type HomeState = ReturnType<typeof state>

export const getters: GetterTree<HomeState, RootState> = {
  getSpecialistData (s) {
    return (key = 'data', { mi, ci, si }: {mi:number, ci:number, si:number}) => {
      if (key === 'data') {
        return s.data[mi].data[ci].data[si]
      }
      if (key === 'l') {
        return s.data[mi].data[ci].l[si]
      }
      return 0
    }
  }
}

export const mutations: MutationTree<HomeState> = {
  SET_SPECIALIST_N (state, n) {
    state.specialistN = n
  },

  SET_EVALUATION_MODEL (state, n) {
    state.evaluationModel = n
  },

  INIT_DATA (s, data: ModelData[]) {
    s.data = data
  },

  INIT_DATA_M2 (s, data: DataM2[]) {
    s.dataM2 = data
  },

  SET_DATA (s, { mi, ci, si, k, v }) {
    if (k === 'l') {
      Vue.set(s.data[mi].data[ci].l, si, v)
    } else {
      Vue.set(s.data[mi].data[ci].data, si, v)
    }
  },

  SET_DATA_M2 (s, { si, v }) {
    Vue.set(s.dataM2, si, v)
  }
}

export const actions: ActionTree<HomeState, RootState> = {
  mockData ({ commit, dispatch, rootState }) {
    const alg = rootState.home.evaluationModel
    commit('SET_SPECIALIST_N', alg === 'M3' ? 5 : 7)
    dispatch('initData', { mock: true })
  },

  setSpecialistN ({ commit, dispatch }, { n }) {
    commit('SET_SPECIALIST_N', n)
    dispatch('initData')
  },

  setEvaluationModel ({ commit, dispatch }, { n }) {
    commit('SET_EVALUATION_MODEL', n)
    if (n !== 'M2') {
      dispatch('initData')
    }
  },

  initData ({ rootGetters, state, rootState, commit }, { mock } = {}) {
    const alg = rootState.home.evaluationModel
    const { linguisticVariables } = rootState.settings.algorithms.M3
    const models: Model[] = rootGetters['settings/getActiveModels']

    const modelSynapticWeightSum = models.reduce((s, m) => s + m.synapticWeight, 0)

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
          synapticWeight: el.synapticWeight,
          data: el.criteria.map<CriterionData>(
            (el, j) => {
              return {
                desiredValue: el.desiredValue,
                synapticWeight: el.synapticWeight,
                data: mock
                  ? alg === 'M3'
                      ? homeDataMock[i].data[j].dataM3
                      : homeDataMock[i].data[j].data
                  : Array(state.specialistN).fill(0),
                l: mock
                  ? homeDataMock[i].data[j].l
                  : Array(state.specialistN).fill(linguisticVariables[0]),
                get min () {
                  return Math.min(...this.data)
                },
                get max () {
                  return Math.max(...this.data)
                },
                get O () {
                  return this.data.reduce((res: number[], d, i) => {
                    const o = this.l[i]?.a2 * d
                    res.push(o)
                    return res
                  }, [])
                },
                get mO () {
                  const a = linguisticVariables[0].a1
                  const b = linguisticVariables[linguisticVariables.length - 1].a2
                  return this.O.reduce((r: number[], d) => {
                    const mo = linearSshaped(d, a, b)
                    r.push(mo)
                    return r
                  }, [])
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
          },
          get Z () {
            const initRes = {
              a: 0,
              b: Array<number>(state.specialistN).fill(0)
            }

            const resSum = this.data.reduce((sum, c) => {
              sum.a += c.synapticWeight
              sum.b = sum.b.map((n, i) => n + (c.mO[i] * c.synapticWeight))
              return sum
            }, initRes)

            const s = resSum.b.map(el => (1 / resSum.a) * el)

            return s
          },
          get W () {
            return this.Z.map((z) => {
              return (this.synapticWeight / modelSynapticWeightSum) * z
            })
          }
        }
      }
    )

    const res2 = Array<DataM2>(state.specialistN).fill({ k: 1, m1Value: 0, specialistIndex: 0, specialistName: '' })

    commit('INIT_DATA', res)
    commit('INIT_DATA_M2', res2)
  },

  setData ({ commit }, { modelIndex, criterionIndex, specialistIndex, key, value }) {
    commit('SET_DATA', {
      mi: modelIndex,
      ci: criterionIndex,
      si: specialistIndex,
      k: key,
      v: value
    })
  },

  setDataM2 ({ commit }, { specialistIndex, value }) {
    commit('SET_DATA_M2', {
      si: specialistIndex,
      v: value
    })
  }
}
