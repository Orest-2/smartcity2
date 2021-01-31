<template>
  <v-row
    v-if="specialistN"
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
          cols="4"
          class="d-flex align-center justify-center"
        >
          Manager's thoughts on the task
        </v-col>
      </v-row>
      <v-divider />
      <v-row
        v-for="(el) in dataM2"
        :key="el.i"
        dense
        align-content="center"
        justify="center"
      >
        <v-col
          cols="2"
          class="d-flex align-center justify-center"
        >
          {{ el.specialistName }}
        </v-col>
        <v-col
          cols="3"
          class="d-flex align-center justify-center"
        >
          <v-text-field
            hide-details="auto"
            class="pa-0"
            :value="el.m1Value"
            @input="setValue(el, Number($event))"
          />
        </v-col>
        <v-col cols="4">
          <v-select
            :items="toOptionArray(linguisticVariables)"
            hide-details="auto"
            class="pa-0"
            :value="el.k"
            @input="setK(el, $event)"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { DataM2 } from '~/types/home'

import { RootState } from '~/types/store'

const state = {
  specialistN: (s: RootState) => s.home.specialistN,
  evaluationModel: (s: RootState) => s.home.evaluationModel,
  dataM2: (s: RootState) => s.home.dataM2,
  linguisticVariables: (s: RootState) => s.settings.algorithms.M2.linguisticVariables
}

export type State = typeof state

export default Vue.extend({
  computed: {
    ...mapState<RootState, State>(state)
  },

  watch: {
    specialistN (n) {
      if (n) {
        this.initDataM2()
      }
    }
  },

  mounted () {
    this.initDataM2()
  },

  methods: {
    ...mapActions({
      setDataM2: 'home/setDataM2'
    }),

    toOptionArray (arr: any[]): any[] {
      return arr.map((el: any) => ({ text: el.title, value: el.k }))
    },

    initDataM2 () {
      for (let i = 0; i < this.specialistN; i++) {
        this.setDataM2({
          specialistIndex: i,
          value: {
            specialistIndex: i,
            specialistName: `e${i}`,
            m1Value: 0,
            k: this.linguisticVariables[Math.floor(this.linguisticVariables.length / 2)].k
          } as DataM2
        })
      }
    },

    setValue (value: DataM2, m1Value: number) {
      this.setDataM2({
        specialistIndex: value.specialistIndex,
        value: {
          ...value,
          m1Value
        }
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
    }
  }
})
</script>
