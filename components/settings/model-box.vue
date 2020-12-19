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
          class="pa-0"
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
              label="Desired value"
              :items="desiredValueOptions"
              hide-details="auto"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model.number="weightingFactor"
              type="number"
              label="Weighting factor"
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
import { mapActions } from 'vuex'

import criteria from './criteria.vue'

import { desiredValueOptions } from '~/constants/settings'

import { Model } from '~/types/settings'

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
    }
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
