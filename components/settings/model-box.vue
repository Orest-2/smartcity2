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
            :label="$t('title')"
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
          <span>{{ $t('type') }}:</span> {{ model.type }}
        </div>
        <v-row>
          <v-col v-if="model.type === 'tests'">
            <v-select
              v-model.number="desiredValue"
              :label="$t('fuzzy_model_desired_value')"
              :items="desiredValueOptions.map((el) => ({ ...el, text: this.$t(el.text) }))"
              hide-details="auto"
            />
          </v-col>
          <v-col v-if="model.type !== 'group_criteria'">
            <v-text-field
              v-model.number="weightingFactor"
              type="number"
              :label="$t('fuzzy_model_weighting_factor')"
              hide-details="auto"
            />
          </v-col>
          <v-col v-if="model.type === 'group_criteria'">
            <v-select
              v-model.number="synapticWeight"
              :label="$t('neuro_fuzzy_model_synaptic_weight')"
              :items="toOptionArray(synapticWeightsM3)"
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
  synapticWeightsM3: (s: RootState) => s.settings.algorithms.M3.synapticWeights
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
    if (!this.synapticWeight) {
      const indx = Math.floor(this.synapticWeightsM3.length / 2)
      this.synapticWeight = this.toOptionArray(this.synapticWeightsM3)[indx].value
    }
  },

  methods: {
    ...mapActions({
      updateModel: 'settings/updateModel',
      removeModel: 'settings/removeModel'
    }),

    toOptionArray (arr: any[]): any[] {
      return arr.map((el: any) => ({ text: this.$t(el.title), value: el.a }))
    },

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
