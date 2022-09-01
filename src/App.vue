<template>
  <v-app v-if="logged" id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list style="padding: 0px; align-items: center" nav dense>
          <v-list-item>
            <v-img
              contain
              lazy-src="./assets/IZT.png"
              max-height="220"
              max-width="250"
              src="./assets/IZT.png"
            ></v-img>
</v-list-item>

      </v-list>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group active-class="active" class="maraginBettwenItems">
          <v-list-item>
            <router-link
              to="/CarGestion"
              class="itemd d-flex flex-row"
              style="text-decoration: none"
            >
              <v-list-item-icon>
                <v-icon large>mdi-car</v-icon>
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
                <v-icon large>mdi-selection-marker</v-icon>
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
                <v-icon large>mdi-map-marker-radius-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Destinations</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link
              to="/DestinationcarrangesGestion"
              class="itemd d-flex flex-row"
              style="text-decoration: none"
            >
              <v-list-item-icon>
                <v-icon large>mdi-map-marker-distance</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Destination carranges </v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link
              to="/ReservationGestion"
              class="itemd d-flex flex-row"
              style="text-decoration: none"
            >
              <v-list-item-icon>
                <v-icon large>mdi-map-marker-radius-outline</v-icon>
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

    <v-app-bar color="#fff" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-img
          contain
          lazy-src="./assets/IZT.png"
          max-height="80"
          max-width="80"
          src="./assets/IZT.png"
        ></v-img>
      </v-toolbar-title>
      <h4  style="color:#e8cc0f" class="text-uppercase ">Inter Ville Zeroual</h4>
      <v-spacer></v-spacer>

      <v-btn icon @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <Login v-else />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Login from "./views/Login.vue";
export default {
  components: {
    Login,
  },
  data() {
    return {
      drawer: false,
      logged: false,
      role: "",
    };
  },
  mounted() {
    if (this.getUserActive == null) {
      this.logged = false;
    } else if (this.getUserActive.role.toUpperCase() == "ADMIN") {
      this.role = this.getUserActive.role;
      this.logged = true;
    }
  },
  computed: {
    ...mapGetters(["getUsers", "getUserActive"]),
  },
  watch: {},
  methods: {
    initialize() {},
    logout() {
      localStorage.clear();
      this.$router.push({
        name: "Login",
      });
      window.location.reload();
    },
    ...mapActions([]),
  },
};
</script>
