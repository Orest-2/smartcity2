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
          <v-expansion-panel
            v-for="(item,i) in 5"
            :key="i"
          >
            <v-expansion-panel-header disable-icon-rotate>
              Model {{ item }}

              <template #actions>
                <v-row
                  align-content="center"
                  justify="center"
                >
                  <v-col
                    class="pa-0 mr-2"
                    align-self="center"
                    @click.stop
                  >
                    <v-switch
                      color="success"
                      hide-details
                      class="pa-0 ma-0"
                    />
                  </v-col>

                  <v-col
                    class="pa-0"
                    align-self="center"
                  >
                    <v-btn
                      icon
                      @click.stop="remove"
                    >
                      <v-icon color="error">
                        mdi-trash-can
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    remove () {
      // console.log('remove')
    }
  },

  head: {
    title: 'Settings'
  }
})
</script>
