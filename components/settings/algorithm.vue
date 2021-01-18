<template>
  <v-card>
    <v-card-title>
      <span class="subtitle-1">
        Linguistic variables of a fuzzy hybrid model for evaluating specialists
      </span>
    </v-card-title>

    <alg-m-2-lves-item
      v-for="(lv, i) in linguisticVariablesM2"
      :key="i"
      :data="lv"
    />
    <v-divider />

    <v-card-title>
      <span class="subtitle-1">
        Linguistic variables of a neuro-fuzzy model for evaluating specialists
      </span>
    </v-card-title>

    <alg-m-3-lves-item
      v-for="(lv, i) in linguisticVariablesM3"
      :key="`M3-${i}`"
      :data="lv"
    />
    <v-divider />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import algM2LvesItem from './alg-m2-lves-item.vue'
import AlgM3LvesItem from './alg-m3-lves-item.vue'
import { RootState } from '~/types/store'

const state = {
  linguisticVariablesM2: (s: RootState) => s.settings.algorithms.M2.linguisticVariables,
  linguisticVariablesM3: (s: RootState) => s.settings.algorithms.M3.linguisticVariables
}

export type State = typeof state

export default Vue.extend({
  components: { algM2LvesItem, AlgM3LvesItem },

  computed: {
    ...mapState<RootState, State>(state)
  }
})
</script>

<style lang="scss" scoped>
</style>
