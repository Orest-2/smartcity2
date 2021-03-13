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

        <v-row
          align-content="center"
          justify="center"
        >
          <v-col
            cols="2"
          >
            <v-form v-model="settingsIDValid">
              <v-text-field
                v-model="settingsID"
                :rules="settingsIDRules"
                :counter="20"
                :label="$t('settings_id')"
                required
              />
            </v-form>
          </v-col>
          <v-col
            cols="4"
            class="d-flex align-center"
          >
            <v-btn
              color="primary"
              elevation="2"
              :disabled="!settingsIDValid"
              @click="getS"
            >
              {{ $t('btn_load_settings') }}
            </v-btn>
            <div class="mx-2" />
            <v-btn
              color="success"
              elevation="2"
              :disabled="!settingsIDValid"
              @click="saveS"
            >
              {{ $t('btn_save_settings') }}
            </v-btn>
          </v-col>
        </v-row>

        <v-tabs
          v-model="tab"
        >
          <v-tab>
            {{ $t('model') }}
          </v-tab>
          <v-tab>
            {{ $t('algorithm') }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-toolbar
              flat
              class="mb-4"
            >
              <v-toolbar-title>
                {{ $t('model_settings') }}
              </v-toolbar-title>

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
                    {{ $t('add_model') }}
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
            >
              <v-toolbar-title>
                {{ $t('algorithm_settings') }}
              </v-toolbar-title>
            </v-toolbar>

            <algorithm />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { RootState } from '~/types/store'

import ModelBox from '~/components/settings/model-box.vue'
import AddModelDialog from '~/components/settings/add-model-dialog.vue'
import Algorithm from '~/components/settings/algorithm.vue'

const state = {
  models: (s: RootState) => s.settings.models,
  sID: (s: RootState) => s.settings.settingsID
}

export type State = typeof state

export default Vue.extend({
  components: {
    ModelBox,
    AddModelDialog,
    Algorithm
  },

  data () {
    return {
      tab: 0,
      settingsIDValid: true,
      settingsIDRules: [
        (v: string) => !!v || 'Required',
        (v: string) => v.length <= 20 || 'Must be less than 10 characters',
      ]
    }
  },

  computed: {
    ...mapState<RootState, State>(state),

    settingsID: {
      get (): string {
        return this.sID
      },
      set (v: string) {
        this.$store.commit('settings/SET_SETTINGS_ID', v)
      }
    }
  },

  methods: {
    ...mapActions({
      getSettingsByID: 'settings/getSettingsByID',
      saveSettingsByID: 'settings/saveSettingsByID'
    }),

    getS (): void {
      this.getSettingsByID({ id: this.settingsID })
    },

    saveS (): void {
      this.saveSettingsByID({ id: this.settingsID })
    }
  },

  head: {
    title: 'Settings'
  }
})
</script>
