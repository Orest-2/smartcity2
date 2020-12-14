<template>
  <v-card
    class="mb-2"
  >
    <v-row>
      <v-col
        cols="12"
        md="1"
        class="d-flex align-center justify-center"
      >
        <span>
          {{ model.title }}
        </span>
      </v-col>
      <v-col>
        <criterion
          v-for="(c, ci) in model.criteria"
          :key="ci"
          :model-index="modelIndex"
          :criterion="c"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import criterion from './criterion.vue'

import { Model } from '~/types/settings'

export default Vue.extend({
  components: { criterion },

  props: {
    model: {
      type: Object as PropType<Model>,
      default: () => ({} as Model)
    }
  },

  computed: {
    modelIndex (): number {
      return this.$vnode.key as number
    }
  }
})
</script>
