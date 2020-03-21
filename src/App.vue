<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list shaped dense>
        <v-list-item to="/employee" link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Employees</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin" link>
          <v-list-item-action>
            <v-icon>mdi-shield-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        ><v-icon>mdi-bullseye-arrow</v-icon> Performance Review</v-toolbar-title
      >
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-col align="stretch" justify="stretch">
          <transition>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </v-col>
      </v-container>
    </v-content>

    <v-footer app>
      <span><a href="https://jack-mason.dev">jack-mason.dev</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: null
  })
};
</script>
