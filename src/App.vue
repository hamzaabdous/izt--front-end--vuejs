<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Izt </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list  nav>
        <v-list-item-group active-class="active" class="maraginBettwenItems">
          <v-list-item>
            <router-link
              to="/CarGestion"
              class="itemd d-flex flex-row"
              style="text-decoration: none"
            >
              <v-list-item-icon>
                <v-icon  large>mdi-car</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Voiture</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link
              to="/CarrangeGestion"
              class="itemd d-flex flex-row"
              style="text-decoration: none"
            >
              <v-list-item-icon>
                <v-icon  large>mdi-selection-marker</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Carrange</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link
              to="/DestinationGestion"
              class="itemd d-flex flex-row"
              style="text-decoration: none"
            >
              <v-list-item-icon>
                <v-icon  large>mdi-map-marker-radius-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Destinations</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link
              to="/DestinationGestion"
              class="itemd d-flex flex-row"
              style="text-decoration: none"
            >
              <v-list-item-icon>
                <v-icon  large>mdi-map-marker-radius-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Reservation</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="deep-orange lighten-2" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Izt</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
  }),
};
</script>
