<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="400px"
  >
    <template #activator="{ on, attrs }">
      <slot
        name="btn"
        :on="on"
        :attrs="attrs"
      >
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </slot>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ $t('add_model') }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
        >
          <v-container class="pa-0">
            <v-row>
              <v-col
                cols="12"
                class="py-0"
              >
                <v-text-field
                  v-model="form.title"
                  :label="`${$t('title')} *`"
                  :rules="[v => !!v || $t('title_is_required')]"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                class="py-0"
              >
                <v-select
                  v-model="form.type"
                  :label="`${$t('type')} *`"
                  :items="types"
                  :rules="[v => !!v || $t('type_is_required')]"
                  required
                />
              </v-col>
              <v-col>
                <small>* {{ $t('indicates_required_field') }}</small>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="grey lighten-1"
          text
          @click="close"
        >
          {{ $t('close') }}
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="add"
        >
          {{ $t('add') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

import { Model, ModelTypes } from '~/types/settings'

export default Vue.extend({
  data () {
    return {
      dialog: false,
      valid: true,
      types: [
        {
          text: this.$t('testing_model_fuzzy_model_only'),
          value: 'tests'
        },
        {
          text: this.$t('values_model_fuzzy_model_only'),
          value: 'values'
        },
        {
          text: this.$t('group_of_criteria_neuro_fuzzy_model_only'),
          value: 'group_criteria'
        }
      ],

      form: {
        title: '',
        type: ''
      }
    }
  },

  methods: {
    ...mapActions({
      addModel: 'settings/addModel'
    }),

    add () {
      const model: Model = {
        title: this.form.title,
        type: this.form.type as ModelTypes,
        active: true,
        desiredValue: 0,
        weightingFactor: 0,
        synapticWeight: 0,
        criteria: []
      }
      const payload = { model }

      const form = this.$refs.form as any

      if (form.validate()) {
        this.addModel(payload)
        this.close()
      }
    },

    close () {
      const form = this.$refs.form as any
      form.reset()

      this.$nextTick(() => {
        this.dialog = false
      })
    }
  }
})
</script>
