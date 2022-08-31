import CustomizedAxios from "../../plugins/axios";

const destinationModule = {
  state: {
    destinations: [],
  },
  mutations: {
    SET_DESTINATIONCARRANGES(state, destinations) {
      state.destinations = destinations;
    },
    ADD_DESTINATION(state, destination) {
      state.destinations.push(destination);
    },
    DELETE_DESTINATION(state, destination) {
      state.destinations = state.destinations.filter(
        (c) => c.id != destination.id
      );
    },
    EDIT_DESTINATION(state, destination) {
      state.destinations = state.destinations.map((c) => {
        if (c.id == destination.id) return destination;
        return c;
      });
    },
  },
  actions: {
    setDESTINATIONSAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("destination/")
          .then((response) => {
            commit("SET_DESTINATIONCARRANGES", response.data.payload);
            console.log("set destination ");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setDESTINATIONbyIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("destination/" + id)
          .then((response) => {
            commit("SET_DESTINATIONCARRANGES", response.data.payload);
            console.log("set destination ");
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addDESTINATIONAction({ commit }, destination) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("destination/create", destination)
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_DESTINATION", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteDESTINATIONAction({ commit }, destination) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("destination/delete", destination)
          .then((response) => {
            commit("DELETE_DESTINATION", destination);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editDESTINATIONAction({ commit }, destination) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("destination/update", destination)
          .then((response) => {
            commit("EDIT_DESTINATION", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getDestinations: (state) => {
      return state.destinations;
    },
  },
};
export default destinationModule;
