import Vue from "vue";
import Vuex from "vuex";



import VuexPersist from "vuex-persist";
import carModule from "./models/carModule";
import carrangeModule from "./models/carrangeModule";
import destinationModule from "./models/destinationModule";

import destinationcarrangesModule from "./models/destinationcarrangesModule";
import reservationModule from "./models/reservationModule";
import userModule from "./models/userModule";

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: "user",
  asyncStorage: false,
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
  reducer: (state) => ({
   userModule: state.userModule,
  }),
});
let store = null;
export default function () {
  store = new Vuex.Store({
    modules: {
      carModule,
      carrangeModule,
      destinationModule,
      destinationcarrangesModule,
      reservationModule,
      userModule
    },
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    plugins: [vuexLocalStorage.plugin],
  });
  return store;
}
export { store };
