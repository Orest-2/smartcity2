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

          <add-model-dialog>
            <template #btn="{ on, attrs }">
              <v-btn
                color="success"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon
                  left
                  dark
                >
                  mdi-plus
                </v-icon>
                Add model
              </v-btn>
            </template>
          </add-model-dialog>
        </v-toolbar>

        <v-expansion-panels
          hover
          :focusable="$vuetify.theme.dark"
        >
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
import AddModelDialog from '~/components/settings/add-model-dialog.vue'

const state = {
  models: (s: RootState) => s.settings.models
}

export type State = typeof state

export default Vue.extend({
  components: {
    ModelBox,
    AddModelDialog
  },

  computed: {
    ...mapState<RootState, State>(state)
  },

  head: {
    title: 'Settings'
  }
})
</script>
