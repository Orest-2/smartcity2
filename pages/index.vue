<template>
  <v-row>
    <v-col
      cols="12"
      class="py-0"
    >
      <v-card class="px-4 py-2">
        <div v-if="!showResult">
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

          <div v-show="sn">
            <model
              v-for="(m, mi) in models"
              :key="mi"
              :model="Object.freeze(m)"
            />
          </div>
        </div>

        <result
          v-if="showResult"
          v-model="showResult"
        />

        <actions
          v-if="!showResult"
          v-model="showResult"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'

import { RootState } from '~/types/store'
import Actions from '~/components/home/actions.vue'
import model from '~/components/home/model.vue'
import Result from '~/components/home/result.vue'

const state = {
  specialistN: (s: RootState) => s.home.specialistN,
  data: (s: RootState) => s.home.data
}

export type State = typeof state

export default Vue.extend({
  components: { model, Actions, Result },

  data () {
    return {
      showResult: false
    }
  },

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
    if (this.data.length === 0) {
      this.initData()
    }
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
