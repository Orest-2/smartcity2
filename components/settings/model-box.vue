<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      disable-icon-rotate
      class="py-2"
    >
      <v-row>
        <v-col
          cols="6"
          md="3"
          class="px-0"
          @click.stop
        >
          <v-text-field
            v-model="title"
            label="Title"
            hide-details="auto"
          />
        </v-col>
      </v-row>

      <template #actions>
        <v-row
          align-content="center"
          justify="center"
        >
          <v-col
            class="pa-0 mr-2"
            align-self="center"
            @click.stop
          >
            <v-switch
              v-model="active"
              color="success"
              hide-details
              class="pa-0 ma-0"
            />
          </v-col>

          <v-col
            class="pa-0"
            align-self="center"
          >
            <v-btn
              icon
              @click.stop="remove"
            >
              <v-icon color="error">
                mdi-trash-can
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-col>
        <div class="mb-2">
          <span>Type:</span> {{ model.type }}
        </div>
        <v-row>
          <v-col v-if="model.type === 'tests'">
            <v-select
              v-model.number="desiredValue"
              label="Fuzzy model desired value"
              :items="desiredValueOptions"
              hide-details="auto"
            />
          </v-col>
          <v-col v-if="model.type !== 'group_criteria'">
            <v-text-field
              v-model.number="weightingFactor"
              type="number"
              label="Fuzzy model weighting factor"
              hide-details="auto"
            />
          </v-col>
          <v-col v-if="model.type === 'group_criteria'">
            <v-select
              v-model.number="synapticWeight"
              label="Neuro-fuzzy model synaptic weight"
              :items="synapticWeightsM3"
              hide-details="auto"
            />
          </v-col>
        </v-row>
      </v-col>
      <criteria
        :model="model"
        :model-index="index"
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions, mapState } from 'vuex'

import criteria from './criteria.vue'

import { desiredValueOptions } from '~/constants/settings'

import { Model } from '~/types/settings'
import { RootState } from '~/types/store'

const state = {
  synapticWeightsM3: (s: RootState) => s.settings.algorithms.M3.synapticWeights.map(e => ({ text: e.title, value: e.a }))
}

export type State = typeof state

export default Vue.extend({
  components: { criteria },

  props: {
    model: {
      type: Object as PropType<Model>,
      required: true,
      default: {} as Model
    }
  },

  data () {
    return {
      desiredValueOptions
    }
  },

  computed: {
    ...mapState<RootState, State>(state),

    index (): number {
      return this.$vnode.key as number
    },

    active: {
      get (): boolean {
        return this.model.active
      },
      set (val: boolean) {
        this.updateModel({ index: this.index, key: 'active', value: val })
      }
    },

    title: {
      get (): string {
        return this.model.title
      },
      set (val: string) {
        this.updateModel({ index: this.index, key: 'title', value: val })
      }
    },

    desiredValue: {
      get (): number {
        return this.model.desiredValue
      },
      set (val: number) {
        this.updateModel({ index: this.index, key: 'desiredValue', value: val })
      }
    },

    weightingFactor: {
      get (): number {
        return this.model.weightingFactor
      },
      set (val: number) {
        this.updateModel({ index: this.index, key: 'weightingFactor', value: Number(val) })
      }
    },

    synapticWeight: {
      get (): number {
        return this.model.synapticWeight
      },
      set (val: number) {
        this.updateModel({ index: this.index, key: 'synapticWeight', value: Number(val) })
      }
    }
  },

  mounted () {
    const indx = Math.floor(this.synapticWeightsM3.length / 2)
    this.synapticWeight = this.synapticWeightsM3[indx].value
  },

  methods: {
    ...mapActions({
      updateModel: 'settings/updateModel',
      removeModel: 'settings/removeModel'
    }),

    remove () {
      this.removeModel({ index: this.index })
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep {
  .v-expansion-panel-content__wrap {
    padding: 0;
  }
}
</style>
