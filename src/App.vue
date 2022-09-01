<template>
  <v-app>
    <v-navigation-drawer
        app
      >
        <v-list
          nav
        >
          <v-list-item @click="changeView('table')">
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Data-table</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeView('card')">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cards</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-app-bar app color="grey lighten-2" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
          alt="Quiteja Logo"
          class="shrink mr-2"
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        </router-link>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ],
    right: null,
  }),
  methods: {
    changeView(view) {
      this.$router.push({path: '/users', query : {...this.$route.query, view}})
    }
  },
};
</script>
