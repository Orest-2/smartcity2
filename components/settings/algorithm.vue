<template>
  <v-card>
    <v-card-title>
      <span class="subtitle-1">
        <b>
          {{ $t('linguistic_variables_of_fuzzy_hybrid_model_for_evaluating_specialists') }}
        </b>
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
        <b>
          {{ $t('linguistic_variables_of_neuro_fuzzy_model_for_evaluating_specialists') }}
        </b>
      </span>
    </v-card-title>

    <alg-m-3-lves-item
      v-for="(lv, i) in linguisticVariablesM3"
      :key="`M3-${i}`"
      :data="lv"
    />
    <v-divider />

    <v-card-title>
      <span class="subtitle-1">
        <b>
          {{ $t('the_synaptic_weights_of_the_groups_of_criteria_neuro_fuzzy_model') }}
        </b>
      </span>
    </v-card-title>

    <alg-m-3-swgc-item
      v-for="(sw, i) in synapticWeightsM3"
      :key="`M3-SW-${i}`"
      :data="sw"
    />
    <v-divider />

    <v-card-title>
      <span class="subtitle-1">
        <b>
          {{ $t('the_scale_of_the_original_variable_Y_of_the_neuro_fuzzy_model') }}
        </b>
      </span>
    </v-card-title>

    <alg-m-3-ovy-item
      v-for="(ov, i) in originalVariableY"
      :key="`M3-OVY-${i}`"
      :data="ov"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import algM2LvesItem from './alg-m2-lves-item.vue'
import AlgM3LvesItem from './alg-m3-lves-item.vue'
import AlgM3SwgcItem from './alg-m3-swgc-item.vue'

import { RootState } from '~/types/store'

const state = {
  linguisticVariablesM2: (s: RootState) => s.settings.algorithms.M2.linguisticVariables,
  linguisticVariablesM3: (s: RootState) => s.settings.algorithms.M3.linguisticVariables,
  synapticWeightsM3: (s: RootState) => s.settings.algorithms.M3.synapticWeights,
  originalVariableY: (s: RootState) => s.settings.algorithms.M3.originalVariableY
}

export type State = typeof state

export default Vue.extend({
  components: { algM2LvesItem, AlgM3LvesItem, AlgM3SwgcItem },

  computed: {
    ...mapState<RootState, State>(state)
  }
})
</script>

<style lang="scss" scoped>
</style>
