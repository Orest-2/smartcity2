<template>
  <v-card class="elevation-0">
    <v-card-title>
      <span class="subtitle-2">
        {{ $t('answers') }}
      </span>
    </v-card-title>
    <v-card-text>
      <v-lazy>
        <v-container class="py-0">
          <answers-item
            v-for="(answer, i) in answers"
            :key="i"
            :answer="answer"
            :criterion-index="criterionIndex"
            :model-index="modelIndex"
          />

          <v-divider class="my-2" />

          <v-btn
            color="second"
            block
            text
            @click="add"
          >
            <v-icon
              left
              dark
            >
              mdi-plus
            </v-icon>
            {{ $t('add_one_more_answer') }}
          </v-btn>
        </v-container>
      </v-lazy>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'

import answersItem from './answers-item.vue'

import { Answer } from '~/types/settings'

export default Vue.extend({
  components: { answersItem },

  props: {
    modelIndex: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    },
    criterionIndex: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    },
    answers: {
      type: Array as PropType<Answer[]>,
      required: true,
      default: [] as Answer[]
    }
  },

  methods: {
    ...mapActions({
      addAnswer: 'settings/addAnswer'
    }),

    add () {
      this.addAnswer({
        modelIndex: this.modelIndex,
        criterionIndex: this.criterionIndex
      })
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
