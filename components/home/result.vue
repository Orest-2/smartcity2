<template>
  <div class="text-center elevation-1 my-2 pa-2">
    <div class="mb-3">
      <span class="headline">Result</span>
    </div>

    <v-row
      align-content="center"
      justify="center"
    >
      <v-col
        cols="12"
      >
        {{ fuzzyModelResult.map(el => `${el.text} - ${el.value.toFixed(3)}`).join(', ') }}
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
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import { RootState } from '~/types/store'

const state = {
  evaluationModel: (s: RootState) => s.home.evaluationModel,
  result: (s: RootState) => s.calculator.result
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

    fuzzyModelResult () {
      return this.result.fuzzyModel.result
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
    back () {
      this.$emit('input', false)
    }
  }
})
</script>
