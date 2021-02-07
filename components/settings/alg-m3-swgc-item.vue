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
          {{ $t(data.title) }}
        </v-col>
        <v-col class="align-self-center">
          <v-text-field
            v-model.number="a"
            type="number"
            label="a"
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
import { SynapticWeightM3 } from '~/types/settings'

export default Vue.extend({
  props: {
    data: {
      type: Object as PropType<SynapticWeightM3>,
      required: true,
      default: {} as SynapticWeightM3
    }
  },

  computed: {
    index (): number {
      const key = this.$vnode.key as string
      return Number(key.split('M3-SW-')[1])
    },

    a: {
      get (): number {
        return this.data.a
      },
      set (a: number | string) {
        this.updateAlgorithm({
          algorithm: 'M3',
          set: 'synapticWeights',
          index: this.index,
          key: 'a',
          value: Number(a) || 1
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
