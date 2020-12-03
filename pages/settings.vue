<template>
  <v-row>
    <v-col>
      <v-card
        tile
      >
        <v-toolbar
          flat
          class="mb-4"
        >
          <v-toolbar-title>Settings</v-toolbar-title>

          <v-spacer />

          <v-btn
            color="success"
          >
            <v-icon
              left
              dark
            >
              mdi-plus
            </v-icon>
            Add model
          </v-btn>
        </v-toolbar>

        <v-expansion-panels>
          <ModelBox
            v-for="(model, i) in models"
            :key="i"
            :model="model"
          />
        </v-expansion-panels>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { RootState } from '~/types/store'

import ModelBox from '~/components/settings/model-box.vue'

const state = {
  models: (s: RootState) => s.settings.models
}

export type State = typeof state

export default Vue.extend({
  components: {
    ModelBox
  },

  computed: {
    ...mapState<RootState, State>(state)
  },

  head: {
    title: 'Settings'
  }
})
</script>
