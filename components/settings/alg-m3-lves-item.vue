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
            v-model.number="a1"
            type="number"
            :label="`a${index+1}`"
            hide-details="auto"
            :disabled="!!index"
          />
        </v-col>
        <v-col class="align-self-center">
          <v-text-field
            v-model.number="a2"
            type="number"
            :label="`a${index+2}`"
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
import { LinguisticVariableM3 } from '~/types/settings'
import { RootState } from '~/types/store'

export default Vue.extend({
  props: {
    data: {
      type: Object as PropType<LinguisticVariableM3>,
      required: true,
      default: {} as LinguisticVariableM3
    }
  },

  computed: {
    index (): number {
      const key = this.$vnode.key as string
      return Number(key.split('M3-')[1])
    },

    a1: {
      get (): number {
        return this.data.a1
      },
      set (k: number | string) {
        this.updateAlgorithm({
          algorithm: 'M3',
          set: 'linguisticVariables',
          index: this.index,
          key: 'a1',
          value: Number(k) || 1
        })
      }
    },

    a2: {
      get (): number {
        return this.data.a2
      },
      set (k: number | string) {
        this.updateAlgorithm({
          algorithm: 'M3',
          set: 'linguisticVariables',
          index: this.index,
          key: 'a2',
          value: Number(k) || 1
        })
        const n = (this.$store.state as RootState).settings.algorithms.M3.linguisticVariables.length - 1

        if (this.index < n) {
          this.updateAlgorithm({
            algorithm: 'M3',
            set: 'linguisticVariables',
            index: this.index + 1,
            key: 'a1',
            value: Number(k) || 1
          })
        }
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
