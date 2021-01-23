<template>
  <div>
    <v-divider class="my-2" />

    <v-hover>
      <template #default="{ hover }">
        <v-row
          :class="{
            'elevation-1': hover,
            'accent': hover,
          }"
        >
          <v-col
            cols="12"
            md="7"
            class="pb-1"
          >
            <v-text-field
              v-model="title"
              label="Title"
              hide-details="auto"
            />
          </v-col>
          <v-col class="pb-1">
            <v-text-field
              v-if="modelType === 'values'"
              v-model.number="desiredValue"
              type="number"
              label="Desired value"
              hide-details="auto"
            />
            <v-text-field
              v-if="modelType === 'group_criteria'"
              v-model.number="synapticWeight"
              type="number"
              label="Neuro-fuzzy model criterion synaptic weight"
              hide-details="auto"
            />
          </v-col>
          <v-col
            cols="12"
            md="1"
            align-self="center"
            class="pb-1"
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
          <v-col
            cols="12"
            class="px-0 pt-0"
          >
            <answers
              v-if="modelType === 'tests'"
              :answers="answers"
              :criterion-index="index"
              :model-index="modelIndex"
            />
          </v-col>
        </v-row>
      </template>
    </v-hover>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'

import answers from './answers.vue'

import { Answer, Criterion, ModelTypes } from '~/types/settings'

export default Vue.extend({
  components: { answers },

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

  computed: {
    index (): number {
      return this.$vnode.key as number
    },

    answers (): Answer[] {
      return this.criterion.answers
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
          value: Number(val)
        })
      }
    },

    synapticWeight: {
      get (): number {
        return this.criterion.synapticWeight
      },
      set (val: number) {
        this.updateCriterion({
          modelIndex: this.modelIndex,
          criterionIndex: this.index,
          key: 'synapticWeight',
          value: Number(val)
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
