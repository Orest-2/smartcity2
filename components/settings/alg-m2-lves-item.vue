<template>
  <div>
    <div>
      <v-divider />
    </div>
    <v-col class="p-0">
      <v-row
        class="px-3"
        dense
      >
        <v-col class="align-self-center">
          {{ data.title }}
        </v-col>
        <v-col class="align-self-center">
          <v-text-field
            v-model.number="k"
            type="number"
            label="K"
            hide-details="auto"
          />
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'
import { LinguisticVariableM2 } from '~/types/settings'

export default Vue.extend({
  props: {
    data: {
      type: Object as PropType<LinguisticVariableM2>,
      required: true,
      default: {} as LinguisticVariableM2
    }
  },

  computed: {
    index (): number {
      return this.$vnode.key as number
    },

    k: {
      get (): number {
        return this.data.k
      },
      set (k: number | string) {
        this.updateAlgorithm({
          algorithm: 'M2',
          set: 'linguisticVariables',
          index: this.index,
          key: 'k',
          value: Number(k) || 1
        })
      }
    }
  },

  methods: {
    ...mapActions({
      updateAlgorithm: 'settings/updateAlgorithm'
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
