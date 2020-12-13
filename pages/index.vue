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

        <v-card
          v-for="(m, i) in models"
          :key="i"
          class="mb-2"
        >
          <v-row>
            <v-col
              cols="12"
              md="1"
              class="d-flex align-center justify-center"
            >
              <span>
                {{ m.title }}
              </span>
            </v-col>
            <v-col>
              <v-row
                v-for="(c, ci) in m.criteria"
                :key="ci"
              >
                <v-col cols="12">
                  {{ c.title }}
                </v-col>

                <v-col cols="12">
                  <v-row>
                    <v-col
                      v-for="(n, ni) in sn"
                      :key="ni"
                      cols="12"
                      md="2"
                    >
                      <v-select
                        v-if="m.type === 'tests'"
                        :items="toOptionArray(c.answers)"
                        :label=" `e${n} Answer`"
                        hide-details="auto"
                      />
                      <v-text-field
                        v-if="m.type === 'values'"
                        type="number"
                        :label=" `e${n} Answer`"
                        hide-details="auto"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import { RootState } from '~/types/store'

const state = {
  specialistN: (s: RootState) => s.home.specialistN
}

export type State = typeof state

export default Vue.extend({
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

  methods: {
    ...mapActions({
      setSpecialistN: 'home/setSpecialistN'
    }),

    toOptionArray (arr: any[]): any[] {
      return arr.map((el, i) => ({ text: `${i + 1}. ${el.title}`, value: el.score }))
    }
  },

  head: {
    title: 'Home'
  }
})
</script>
