<template>
  <v-row>
    <v-col>
      <v-card
        tile
      >
        <!-- <v-toolbar
          flat
        >
          <v-toolbar-title>Settings</v-toolbar-title>
        </v-toolbar> -->

        <v-tabs
          v-model="tab"
        >
          <v-tab>
            Model
          </v-tab>
          <v-tab>
            Algorithm
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-toolbar
              flat
              class="mb-4"
            >
              <v-toolbar-title>Model Settings</v-toolbar-title>

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
          </v-tab-item>
          <v-tab-item>
            <v-toolbar
              flat
              class="mb-4"
            >
              <v-toolbar-title>Algorithm Settings</v-toolbar-title>
            </v-toolbar>
          </v-tab-item>
        </v-tabs-items>
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

  data () {
    return {
      tab: 0
    }
  },

  computed: {
    ...mapState<RootState, State>(state)
  },

  head: {
    title: 'Settings'
  }
})
</script>
