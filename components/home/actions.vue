<template>
  <div class="text-center elevation-1 my-2 pa-2">
    <div class="mb-3">
      <span class="headline">
        {{ $t('actions') }}
      </span>
    </div>

    <v-row
      align-content="center"
      justify="center"
    >
      <v-col
        v-if="!['M2'].includes(evaluationModel) && !value"
        cols="12"
      >
        <v-btn
          class="mx-2"
          @click="mock"
        >
          {{ $t('fill_with_test_data') }}
        </v-btn>
      </v-col>
      <v-col
        v-if="sn"
        cols="12"
      >
        <v-btn
          color="primary"
          class="mx-2"
          @click="calculateAndShowRes"
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

import { RootState } from '~/types/store'

const state = {
  specialistN: (s: RootState) => s.home.specialistN,
  evaluationModel: (s: RootState) => s.home.evaluationModel
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

    sn: {
      get (): number {
        return this.specialistN
      }
    }
  },

  methods: {
    ...mapActions({
      mockData: 'home/mockData',
      calculate: 'calculator/calculate'
    }),

    mock () {
      this.mockData()
    },

    calculateAndShowRes (): void {
      this.calculate().then(() => {
        this.$emit('input', true)
      })
    }
  }
})
</script>
