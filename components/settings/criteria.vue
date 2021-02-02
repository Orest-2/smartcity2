<template>
  <v-card>
    <v-card-title>
      <span class="subtitle-1">
        {{ $t('сriteria') }}
      </span>
    </v-card-title>
    <v-card-text>
      <v-container class="py-0">
        <criteria-item
          v-for="(criterion, i) in criteria"
          :key="i"
          :criterion="criterion"
          :model-index="modelIndex"
          :model-type="type"
        />

        <v-divider class="my-4" />

        <v-btn
          color="second"
          block
          @click="add"
        >
          <v-icon
            left
            dark
          >
            mdi-plus
          </v-icon>
          {{ $t('add_one_more_criterion') }}
        </v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'

import criteriaItem from './criteria-item.vue'
import { Criterion, Model } from '~/types/settings'

export default Vue.extend({
  components: { criteriaItem },

  props: {
    modelIndex: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    },
    model: {
      type: Object as PropType<Model>,
      required: true,
      default: {} as Model
    }
  },

  computed: {
    criteria (): Criterion[] {
      return this.model.criteria
    },

    type (): string {
      return this.model.type
    }
  },

  methods: {
    ...mapActions({
      addCriterion: 'settings/addCriterion'
    }),

    add () {
      this.addCriterion({ modelIndex: this.modelIndex })
    }
  }
})
</script>
