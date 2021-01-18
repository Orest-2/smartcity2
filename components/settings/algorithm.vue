<template>
  <v-card>
    <v-card-title>
      <span class="subtitle-1">
        Linguistic variables of a fuzzy hybrid model for assessing specialists
      </span>
    </v-card-title>

    <alg-m-2-lves-item
      v-for="(lv, i) in linguisticVariables"
      :key="i"
      :data="lv"
    />

    <v-card-text />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import algM2LvesItem from './alg-m2-lves-item.vue'
import { RootState } from '~/types/store'

const state = {
  linguisticVariables: (s: RootState) => s.settings.algorithms.M2.linguisticVariables
}

export type State = typeof state

export default Vue.extend({
  components: { algM2LvesItem },
  computed: {
    ...mapState<RootState, State>(state)
  }
})
</script>

<style lang="scss" scoped>
</style>
