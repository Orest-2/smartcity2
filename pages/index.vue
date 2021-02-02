<template>
  <v-row>
    <v-col
      cols="12"
      class="py-0"
    >
      <v-card class="px-2 py-2">
        <div v-if="!showResult">
          <div class="text-center elevation-1 mt-2 mb-5 pa-2">
            <span class="headline">
              {{ $t('in_data') }}
            </span>

            <v-row
              class="flex-column"
              align-content="center"
              justify="center"
            >
              <v-col
                cols="12"
                md="4"
              >
                <v-select
                  v-model="em"
                  :items="evaluationModels"
                  :label="$t('select_evaluation_model')"
                  hide-details="auto"
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model.number="sn"
                  :label="$t('number_of_specialists')"
                  placeholder="Please enter the number of specialists"
                  hide-details="auto"
                  type="number"
                  min="0"
                />
              </v-col>
            </v-row>
          </div>

          <div
            v-if="!['M2'].includes(em)"
            v-show="sn"
          >
            <model
              v-for="(m, mi) in models"
              :key="mi"
              :model="Object.freeze(m)"
            />
          </div>
          <div v-else>
            <m-2-input />
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
import { evaluationModels } from '~/constants/home'

import Actions from '~/components/home/actions.vue'
import model from '~/components/home/model.vue'
import Result from '~/components/home/result.vue'
import M2Input from '~/components/home/m2-input.vue'

const state = {
  specialistN: (s: RootState) => s.home.specialistN,
  data: (s: RootState) => s.home.data,
  evaluationModel: (s: RootState) => s.home.evaluationModel
}

export type State = typeof state

export default Vue.extend({
  name: 'Home',

  components: { model, Actions, Result, M2Input },

  data () {
    return {
      showResult: false,
      evaluationModels: evaluationModels.map(el => ({ ...el, text: this.$t(el.text) }))
    }
  },

  computed: {
    ...mapState<RootState, State>(state),

    ...mapGetters({
      models: 'settings/getActiveModels'
    }),

    em: {
      get (): string {
        return this.evaluationModel
      },
      set (val: string) {
        this.setEvaluationModel({ n: val })
      }
    },

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
    if (this.em === 'M2') {
      this.em = 'M1'
    }
  },

  methods: {
    ...mapActions({
      setSpecialistN: 'home/setSpecialistN',
      initData: 'home/initData',
      setEvaluationModel: 'home/setEvaluationModel'
    })
  },

  head: {
    title: 'Home'
  }
})
</script>
