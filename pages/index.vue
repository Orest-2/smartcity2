<template>
  <v-row>
    <v-col cols="12">
      <v-card class="px-4 pb-2">
        <div class="text-center elevation-1 my-2 pa-2">
          <span class="headline">Incoming data</span>

          <v-row>
            <v-col>
              <v-text-field
                v-model.number="sn"
                label="The number of specialists"
                placeholder="Please enter the number of specialists"
                hide-details="auto"
                type="number"
                min="0"
              />
            </v-col>
          </v-row>
        </div>

        <model
          v-for="(m, mi) in models"
          :key="mi"
          :model="m"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'

import { RootState } from '~/types/store'

import model from '~/components/home/model.vue'

const state = {
  specialistN: (s: RootState) => s.home.specialistN
}

export type State = typeof state

export default Vue.extend({
  components: { model },

  computed: {
    ...mapState<RootState, State>(state),

    ...mapGetters({
      models: 'settings/getActiveModels'
    }),

    sn: {
      get (): number {
        return this.specialistN
      },
      set (n: number) {
        this.setSpecialistN({ n })
      }
    }
  },

  created () {
    this.initData()
  },

  methods: {
    ...mapActions({
      setSpecialistN: 'home/setSpecialistN',
      initData: 'home/initData'
    })
  },

  head: {
    title: 'Home'
  }
})
</script>
