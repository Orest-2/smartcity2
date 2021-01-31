<template>
  <div class="text-center elevation-1 my-2 pa-2">
    <div class="mb-3">
      <span class="headline">Result</span>
    </div>

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
            Specialists
          </v-col>
          <v-col
            cols="3"
            class="d-flex align-center justify-center"
          >
            Aggregate assessment of specialists' competencies
          </v-col>
          <v-col
            v-if="continueUsingM2"
            cols="4"
            class="d-flex align-center justify-center"
          >
            Manager's thoughts on the task
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
          label="Involvement of expert opinion"
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
            Specialists
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
            Specialists
          </v-col>
          <v-col
            cols="4"
            class="d-flex align-center justify-center"
          >
            Specialist rating
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
          Back
        </v-btn>

        <v-btn
          v-if="continueUsingM2"
          color="primary"
          class="mx-2"
          @click="calculateM2"
        >
          Evaluate
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
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
    }
  },

  methods: {
    ...mapActions({
      setEvaluationModel: 'home/setEvaluationModel',
      calculate: 'calculator/calculate',
      setDataM2: 'home/setDataM2'
    }),

    getLinguisticEvaluation (val: number) {
      return this.originalVariableY.find((el) => {
        return val > el.a1 && val <= el.a2
      })?.title
    },

    toOptionArray (arr: any[]): any[] {
      return arr.map((el: any) => ({ text: el.title, value: el.k }))
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
