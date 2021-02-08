<template>
  <div>
    <v-divider class="my-1" />

    <v-row class="my-1">
      <v-col
        cols="12"
        md="7"
        class="py-0"
      >
        <v-text-field
          v-model="title"
          :label="$t('title')"
          hide-details="auto"
        />
      </v-col>
      <v-col class="py-0">
        <v-text-field
          v-model="score"
          type="number"
          :label="$t('score')"
          hide-details="auto"
        />
      </v-col>
      <v-col
        cols="12"
        md="1"
        align-self="center"
        class="py-md-0 py-sm-2"
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
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'

import { Answer } from '~/types/settings'

export default Vue.extend({
  props: {
    answer: {
      type: Object as PropType<Answer>,
      required: true,
      default: {} as Answer
    },
    modelIndex: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    },
    criterionIndex: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    }
  },

  computed: {
    index (): number {
      return this.$vnode.key as number
    },

    title: {
      get (): string {
        return this.answer.title
      },
      set (val: string) {
        this.updateAnswer({
          modelIndex: this.modelIndex,
          criterionIndex: this.criterionIndex,
          answerIndex: this.index,
          key: 'title',
          value: val
        })
      }
    },

    score: {
      get (): number {
        return this.answer.score
      },
      set (val: number) {
        this.updateAnswer({
          modelIndex: this.modelIndex,
          criterionIndex: this.criterionIndex,
          answerIndex: this.index,
          key: 'score',
          value: val
        })
      }
    }
  },

  methods: {
    ...mapActions({
      removeAnswer: 'settings/removeAnswer',
      updateAnswer: 'settings/updateAnswer'
    }),

    remove () {
      this.removeAnswer({
        modelIndex: this.modelIndex,
        criterionIndex: this.criterionIndex,
        answerIndex: this.index
      })
    }
  }

})
</script>
