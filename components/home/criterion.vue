<template>
  <v-row>
    <v-col cols="12">
      {{ criterionIndex+1 }}. {{ criterion.title }}
    </v-col>

    <v-col cols="12">
      <v-row>
        <specialist
          v-for="(sn, si) in specialistN"
          :key="si"
          :model-index="modelIndex"
          :criterion-index="criterionIndex"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapState } from 'vuex'

import specialist from './specialist.vue'
import { Criterion } from '~/types/settings'
import { RootState } from '~/types/store'

const state = {
  specialistN: (s: RootState) => s.home.specialistN
}

export type State = typeof state

export default Vue.extend({
  components: { specialist },

  props: {
    criterion: {
      type: Object as PropType<Criterion>,
      required: true,
      default: {} as Criterion
    },
    modelIndex: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    }
  },

  computed: {
    ...mapState<RootState, State>(state),

    criterionIndex (): number {
      return this.$vnode.key as number
    }
  }
})
</script>
