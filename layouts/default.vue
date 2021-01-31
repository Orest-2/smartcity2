<template>
  <v-app
    :key="$i18n.locale"
    light
  >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template #append>
        <div class="text-center">
          <v-btn
            icon
            block
            tile
            @click.stop="miniVariant = !miniVariant"
          >
            <v-icon>{{ `mdi-chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            class="ma-5"
            v-bind="attrs"
            v-on="on"
          >
            {{ $i18n.localeProperties.name }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="locale in availableLocales"
            :key="locale.code"
            link
            @click="setL(locale.code)"
          >
            <v-list-item-title v-text="locale.name" />
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        icon
        @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <client-only>
        <v-container>
          <nuxt />
        </v-container>
      </client-only>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      light: true,
      drawer: true,
      miniVariant: false,
      items: [
        {
          icon: 'mdi-home',
          title: this.$t('home'),
          to: '/'
        },
        {
          icon: 'mdi-cog',
          title: this.$t('settings'),
          to: '/settings'
        }
      ],
      title: 'Smart City'
    }
  },

  computed: {
    availableLocales () {
      return this.$i18n.locales?.filter(i => typeof i !== 'string' && i.code !== this.$i18n.locale)
    }
  },

  methods: {
    setL (code: string) {
      this.$i18n.setLocale(code)
    }
  }
})
</script>
