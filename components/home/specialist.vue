<template>
  <v-col
    cols="12"
    md="2"
  >
    <v-lazy v-if="evaluationModel === 'M1'">
      <v-select
        v-if="model.type === 'tests'"
        v-model.number="specialistData"
        :items="toOptionArray(criterion.answers)"
        :label=" `e${specialistIndex+1} Answer`"
        hide-details="auto"
      />

      <v-text-field
        v-if="model.type === 'values'"
        v-model.number="specialistData"
        type="number"
        :label=" `e${specialistIndex+1} Score`"
        hide-details="auto"
      />
    </v-lazy>

    <v-lazy v-if="evaluationModel === 'M3'">
      <div class="d-flex">
        <v-select
          :key="1"
          v-model.number="specialistDataL"
          :items="linguisticVariablesM3"
          label="L"
          hide-details="auto"
          class="mr-1"
        />

        <v-text-field
          :key="2"
          v-model.number="specialistData"
          type="number"
          label="d"
          hide-details="auto"
          class="ml-1"
        />
      </div>
    </v-lazy>
  </v-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'

import { Criterion, Model, SynapticWeightM3 } from '~/types/settings'
import { RootState } from '~/types/store'

const state = {
  evaluationModel: (s: RootState) => s.home.evaluationModel,
  linguisticVariablesM3: (s: RootState) => s.settings.algorithms.M3.linguisticVariables.map(e => ({ text: e.title.split('-')[0], value: e }))
}

export type State = typeof state

export default Vue.extend({
  props: {
    modelIndex: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    },
    criterionIndex: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    }
  },

  computed: {
    ...mapState<RootState, State>(state),

    ...mapGetters({
      getModel: 'settings/getModel',
      getSpecialistData: 'home/getSpecialistData'
    }),

    specialistIndex (): number {
      return this.$vnode.key as number
    },

    model (): Model {
      return Object.freeze(this.getModel(this.modelIndex))
    },

    criterion ():Criterion {
      return Object.freeze(this.model.criteria[this.criterionIndex])
    },

    specialistDataL: {
      get (): SynapticWeightM3 {
        return this.getSpecialistData('l', {
          mi: this.modelIndex,
          ci: this.criterionIndex,
          si: this.specialistIndex
        })
      },
      set (val: SynapticWeightM3) {
        this.setData({
          modelIndex: this.modelIndex,
          criterionIndex: this.criterionIndex,
          specialistIndex: this.specialistIndex,
          key: 'l',
          value: val
        })
      }
    },

    specialistData: {
      get (): number {
        return this.getSpecialistData('data', {
          mi: this.modelIndex,
          ci: this.criterionIndex,
          si: this.specialistIndex
        })
      },
      set (val: number) {
        this.setData({
          modelIndex: this.modelIndex,
          criterionIndex: this.criterionIndex,
          specialistIndex: this.specialistIndex,
          value: Number(val)
        })
      }
    }
  },

  methods: {
    ...mapActions({
      setData: 'home/setData'
    }),

    toOptionArray (arr: any[]): any[] {
      return arr.map((el, i) => ({ text: `${i + 1}. ${el.title}`, value: el.score }))
    }
  }
})
</script>
