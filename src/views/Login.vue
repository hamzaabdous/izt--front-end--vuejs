<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-row>
                  <v-col cols="2"></v-col>
                  <v-col cols="8" style="color: red" v-if="failedAuth">
                    <v-icon large color="red darken-2">
                      mdi-lock-alert-outline
                    </v-icon>
                    {{ " " }} Incorrect username or password !
                  </v-col>
                  <v-col cols="1"></v-col>
                </v-row>
                <v-row>
                  <v-col cols="2"></v-col>
                  <v-col cols="8">
                    <v-text-field
                      outlined
                      prepend-icon="mdi-account-box-outline"
                      v-model="username"
                      label="username"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="1"></v-col>
                </v-row>
                <v-row>
                  <v-col cols="2"></v-col>
                  <v-col cols="8">
                    <v-text-field
                      outlined
                      prepend-icon="mdi-lock-outline"
                      type="password"
                      v-model="password"
                      label="password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1"></v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  width="150"
                  height="40"
                  color="primary"
                  class="mb-2  white--text"
                  @click="Login"
                  >Login</v-btn
                >
                <v-spacer></v-spacer>

              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      failedAuth: false,

      logged: false,
      username: null,
      password: null,
      userActive: {
        user: {
          id: null,
          username: "",
          lastName: "",
          firstName: "",
          email: "",
          phoneNumber: "",
          fonction_id: null,
          created_at: "",
          updated_at: "",
          fonction: {
            id: null,
            name: "",
            department_id: null,
            created_at: "",
            updated_at: "",
            department: {
              id: null,
              name: "",
              created_at: "",
              updated_at: "",
            },
          },
        },
        token: "",
      },
    };
  },
  mounted() {
    document.title = "Dashboard";

    this.initialize();
  },
  computed: {
    ...mapGetters(["getUsers", "getUserActive"]),
  },
  watch: {},
  methods: {
    initialize() {
      console.log("xccc");
    },
    Login() {
      console.log("username", this.username);
      console.log("password", this.password);
      var userLogin = {
        username: this.username,
        password: this.password,
      };
      console.log("this.userActive", this.userActive);
      this.LoginAction(userLogin)
        .then((resolve) => {
          console.log("user login", resolve);
          if (resolve.user.role.toUpperCase() == "ADMIN") {
            this.$router.push({
              name: "CarGestion",
            });
            window.location.reload();
          } else {
            localStorage.clear();
            swal("Oops", "Something went wrong you are not a Admin!", "error");
            // window.location.reload();
          }
        })
        .catch(() => {
          this.failedAuth = true;
        });
    },
    ...mapActions(["setUsersAction", "editUserAction", "LoginAction"]),
  },
};
</script>
<style></style>
