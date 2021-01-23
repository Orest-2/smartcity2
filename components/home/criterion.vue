<template>
  <v-row class="ma-0">
    <v-col
      cols="12"
      class="pb-0"
    >
      {{ criterionIndex+1 }}. {{ criterion.title }}
    </v-col>

    <v-col cols="12">
      <v-lazy>
        <v-row class="ma-0 ma-md-n3">
          <specialist
            v-for="(sn, si) in specialistN"
            :key="si"
            :model-index="modelIndex"
            :criterion-index="criterionIndex"
          />
        </v-row>
      </v-lazy>
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
