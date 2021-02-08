<template>
  <div class="text-center elevation-1 my-2 pa-2">
    <div class="mb-3">
      <span class="headline">
        {{ $t('result') }}
      </span>
    </div>

    <v-expansion-panels
      v-if="intermidiateValues.length"
      class="mb-5"
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <div class="text-center">
            {{ $t('see_intermediate_values') }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div
            v-for="(iv, i) in intermidiateValues"
            :key="i"
            class="my-2"
          >
            <div
              v-for="([k, v], j) in Object.entries(iv)"
              :key="j"
              class="d-flex justify-center align-center my-2"
            >
              <b class="mr-4">
                {{ k }}
              </b>
              <div
                class="text-pre-line"
                v-html="getValue(v)"
              />
            </div>
            <v-divider
              v-if="i !== intermidiateValues.length -1"
              class="mt-2"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-row
      align-content="center"
      justify="center"
      class="flex-column"
    >
      <v-col
        v-if="['M1', 'M2'].includes(evaluationModel)"
        cols="12"
        md="8"
        class="mx-auto"
      >
        <v-row
          dense
          align-content="center"
          justify="center"
        >
          <v-col
            cols="2"
            class="d-flex align-center justify-center"
          >
            {{ $t('specialists') }}
          </v-col>
          <v-col
            cols="3"
            class="d-flex align-center justify-center"
          >
            {{ $t('aggregate_assessment_of_specialists_competencies') }}
          </v-col>
          <v-col
            v-if="continueUsingM2"
            cols="4"
            class="d-flex align-center justify-center"
          >
            {{ $t('managers_thoughts_on_the_task') }}
          </v-col>
        </v-row>
        <v-divider />
        <v-row
          v-for="(el) in fuzzyModelResult"
          :key="el.i"
          dense
          align-content="center"
          justify="center"
        >
          <v-col
            cols="2"
            class="d-flex align-center justify-center"
          >
            {{ el.text }}
          </v-col>
          <v-col
            cols="3"
            class="d-flex align-center justify-center"
          >
            {{ el.value.toFixed(3) }}
          </v-col>
          <v-col
            v-if="continueUsingM2"
            cols="4"
          >
            <v-select
              :items="toOptionArray(linguisticVariables)"
              hide-details="auto"
              class="pa-0"
              :value="dataM2[el.i].k"
              @input="setK(dataM2[el.i], $event)"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col
        v-if="['M1', 'M2'].includes(evaluationModel)"
        cols="12"
        md="6"
        class="mx-auto"
      >
        <v-checkbox
          v-model="continueUsingM2"
          :label="$t('involvement_of_expert_opinion')"
          hide-details="auto"
          class="d-inline-block"
        />
      </v-col>

      <v-col
        v-if="['M2'].includes(evaluationModel) && hybridFuzzyModelResult.length"
        cols="12"
        md="8"
        class="mx-auto"
      >
        <v-row
          dense
          align-content="center"
          justify="center"
        >
          <v-col
            cols="2"
            class="d-flex align-center justify-center"
          >
            {{ $t('specialists') }}
          </v-col>
          <v-col
            cols="3"
            class="d-flex align-center justify-center"
          >
            f(a)
          </v-col>
        </v-row>
        <v-divider />
        <v-row
          v-for="(el) in hybridFuzzyModelResult"
          :key="el.i"
          dense
          align-content="center"
          justify="center"
        >
          <v-col
            cols="2"
            class="d-flex align-center justify-center"
          >
            {{ el.text }}
          </v-col>
          <v-col
            cols="3"
            class="d-flex align-center justify-center"
          >
            {{ el.value.toFixed(3) }}
          </v-col>
        </v-row>
      </v-col>

      <v-col
        v-if="['M3'].includes(evaluationModel)"
        cols="12"
        md="8"
        class="mx-auto"
      >
        <v-row
          dense
          align-content="center"
          justify="center"
        >
          <v-col
            cols="2"
            class="d-flex align-center justify-center"
          >
            {{ $t('specialists') }}
          </v-col>
          <v-col
            cols="4"
            class="d-flex align-center justify-center"
          >
            {{ $t('specialist_rating') }}
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <v-row
          v-for="(el) in neuroFuzzyNetworkResult"
          :key="el.i"
          align-content="center"
          justify="center"
        >
          <v-col
            cols="2"
            class="d-flex align-center justify-center"
          >
            {{ el.text }}
          </v-col>
          <v-col
            cols="4"
            class="d-flex align-center justify-center"
          >
            {{ getLinguisticEvaluation(el.value) }} ({{ el.value.toFixed(4) }})
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
      >
        <v-btn
          class="mx-2"
          @click="back"
        >
          {{ $t('back') }}
        </v-btn>

        <v-btn
          v-if="continueUsingM2"
          color="primary"
          class="mx-2"
          @click="calculateM2"
        >
          {{ $t('evaluate') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { IntermediateFuzzyModelResult, IntermediateNeuroFuzzyNetworkResult } from '~/types/calculator'
import { DataM2 } from '~/types/home'

import { RootState } from '~/types/store'

const state = {
  evaluationModel: (s: RootState) => s.home.evaluationModel,
  dataM2: (s: RootState) => s.home.dataM2,
  result: (s: RootState) => s.calculator.result,
  linguisticVariables: (s: RootState) => s.settings.algorithms.M2.linguisticVariables,
  originalVariableY: (s: RootState) => s.settings.algorithms.M3.originalVariableY
}

export type State = typeof state

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState<RootState, State>(state),

    continueUsingM2: {
      get (): boolean {
        return this.evaluationModel === 'M2'
      },
      set (val: boolean) {
        if (val) {
          if (!this.hybridFuzzyModelResult.length) {
            this.initDataM2()
          }
          this.setEvaluationModel({ n: 'M2' })
        } else {
          this.setEvaluationModel({ n: 'M1' })
        }
      }
    },

    fuzzyModelResult (): { text: string; value: number; i:number; }[] {
      return this.result.fuzzyModel.result
        .map(
          (el, i) => {
            return {
              text: `e${i + 1}`,
              value: el,
              i
            }
          }
        )
        .sort(
          (a, b) => this.continueUsingM2 ? 1 : b.value - a.value
        )
    },

    hybridFuzzyModelResult (): { text: string; value: number; }[] {
      return this.result.hybridFuzzyModel.result
        .map(
          (el, i) => {
            return {
              text: `e${i + 1}`,
              value: el
            }
          }
        )
        .sort(
          (a, b) => b.value - a.value
        )
    },

    neuroFuzzyNetworkResult (): { text: string; value: number; }[] {
      return this.result.neuroFuzzyNetwork.result
        .map(
          (el, i) => {
            return {
              text: `e${i + 1}`,
              value: el
            }
          }
        )
        .sort(
          (a, b) => b.value - a.value
        )
    },

    intermidiateValues (): IntermediateFuzzyModelResult[] | IntermediateNeuroFuzzyNetworkResult[] {
      if (this.evaluationModel === 'M1' || this.evaluationModel === 'M2') {
        return this.result.fuzzyModel.intermediateResults
      }
      if (this.evaluationModel === 'M3') {
        return this.result.neuroFuzzyNetwork.intermediateResults
      }
      return []
    }
  },

  methods: {
    ...mapActions({
      setEvaluationModel: 'home/setEvaluationModel',
      calculate: 'calculator/calculate',
      setDataM2: 'home/setDataM2'
    }),

    getValue (v: number | number[], n = -1): string {
      if (Array.isArray(v)) {
        const line = v.map((e, i) => this.getValue(e, i + 1))

        n = Array.isArray(v[0]) ? -1 : 1

        return `${n === -1 ? line.join('\n') : line.join(' | ')}`
      }

      return v.toFixed(4)
    },

    getLinguisticEvaluation (val: number) {
      const ovy = this.originalVariableY.find((el) => {
        return val > el.a1 && val <= el.a2
      })?.title || ''
      return this.$t(ovy)
    },

    toOptionArray (arr: any[]): any[] {
      return arr.map((el: any) => ({ text: this.$t(el.title), value: el.k }))
    },

    initDataM2 () {
      this.fuzzyModelResult.forEach((el) => {
        this.setDataM2({
          specialistIndex: el.i,
          value: {
            specialistIndex: el.i,
            specialistName: el.text,
            m1Value: el.value,
            k: this.linguisticVariables[Math.floor(this.linguisticVariables.length / 2)].k
          } as DataM2
        })
      })
    },

    setK (value: DataM2, k: number) {
      this.setDataM2({
        specialistIndex: value.specialistIndex,
        value: {
          ...value,
          k
        }
      })
    },

    calculateM2 () {
      this.calculate()
    },

    back () {
      this.$emit('input', false)
    }
  }
})
</script>
