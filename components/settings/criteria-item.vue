<template>
  <div>
    <v-row>
      <v-divider />
    </v-row>

    <v-hover>
      <template #default="{ hover }">
        <v-row
          :class="`elevation-${hover ? 1 : 0}`"
          class="my-1"
        >
          <v-col
            cols="12"
            md="7"
          >
            <v-text-field
              v-model="title"
              label="Title"
              hide-details="auto"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-if="modelType === 'values'"
              v-model="desiredValue"
              label="Desired value"
              hide-details="auto"
            />
            <v-select
              v-if="modelType === 'tests'"
              v-model="desiredValue"
              label="Desired value"
              :items="desiredValueOptions"
            />
          </v-col>
          <v-col
            cols="12"
            md="1"
            align-self="center"
          >
            <v-row
              justify="end"
              align="center"
            >
              <div>
                <v-btn
                  icon
                  right
                  @click="remove"
                >
                  <v-icon color="error">
                    mdi-trash-can
                  </v-icon>
                </v-btn>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </template>
    </v-hover>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'

import { desiredValueOptions } from '~/constants/settings'
import { Criterion, ModelTypes } from '~/types/settings'

export default Vue.extend({
  props: {
    criterion: {
      type: Object as PropType<Criterion>,
      required: true,
      default: {} as Criterion
    },
    modelIndex: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    },
    modelType: {
      type: String as PropType<ModelTypes>,
      required: true,
      default: ''
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

    title: {
      get (): string {
        return this.criterion.title
      },
      set (val: string) {
        this.updateCriterion({
          modelIndex: this.modelIndex,
          criterionIndex: this.index,
          key: 'title',
          value: val
        })
      }
    },

    desiredValue: {
      get (): number {
        return this.criterion.desiredValue
      },
      set (val: number) {
        this.updateCriterion({
          modelIndex: this.modelIndex,
          criterionIndex: this.index,
          key: 'desiredValue',
          value: val
        })
      }
    }
  },

  methods: {
    ...mapActions({
      removeCriterion: 'settings/removeCriterion',
      updateCriterion: 'settings/updateCriterion'
    }),

    remove () {
      this.removeCriterion({
        modelIndex: this.modelIndex,
        criterionIndex: this.index
      })
    }
  }

})
</script>
