<template>
  <v-col
    cols="12"
    md="2"
  >
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
  </v-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions, mapGetters } from 'vuex'

import { Criterion, Model } from '~/types/settings'

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
    ...mapGetters({
      getModel: 'settings/getModel',
      getSpecialistData: 'home/getSpecialistData'
    }),

    specialistIndex (): number {
      return this.$vnode.key as number
    },

    model (): Model {
      return this.getModel(this.modelIndex)
    },

    criterion ():Criterion {
      return this.model.criteria[this.criterionIndex]
    },

    specialistData: {
      get (): number {
        return this.getSpecialistData({
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
