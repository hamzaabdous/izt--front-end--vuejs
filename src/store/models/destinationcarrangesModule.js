import CustomizedAxios from "../../plugins/axios";

const destinationcarrangesModule = {
  state: {
    destinationcarranges: [],
  },
  mutations: {
    SET_DESTINATIONCARRANGES(state, destinationcarranges) {
      state.destinationcarranges = destinationcarranges;
    },
    ADD_DESTINATIONCARRANGE(state, destinationcarrange) {
      state.destinationcarranges.push(destinationcarrange);
    },
    DELETE_DESTINATIONCARRANGE(state, destinationcarrange) {
      state.destinationcarranges = state.destinationcarranges.filter(
        (c) => c.id != destinationcarrange.id
      );
    },
    EDIT_DESTINATIONCARRANGE(state, destinationcarrange) {
      state.destinationcarranges = state.destinationcarranges.map((c) => {
        if (c.id == destinationcarrange.id) return destinationcarrange;
        return c;
      });
    },
  },
  actions: {
    setDESTINATIONCARRANGESAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("destinationcarranges/getdestination_carranges_by_destination_id")
          .then((response) => {
            commit("SET_DESTINATIONCARRANGES", response.data.payload);
            console.log("set destinationcarrange ");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addDESTINATIONCARRANGEAction({ commit }, destinationcarrange) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("destinationcarranges/addDestinationcarranges", destinationcarrange)
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_DESTINATIONCARRANGE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateDESTINATIONCARRANGEAction({ commit }, destinationcarrange) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("destinationcarranges/UpdateDestinationcarrangesByid", destinationcarrange)
          .then((response) => {
            console.log("res add ", response);
            commit("EDIT_DESTINATIONCARRANGE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteDESTINATIONCARRANGEAction({ commit }, destinationcarrange) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("destinationcarranges/deleteDestinationcarrangesBydestination_id", destinationcarrange)
          .then((response) => {
            commit("DELETE_DESTINATIONCARRANGE", destinationcarrange);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getDestinationcarranges: (state) => {
      return state.destinationcarranges;
    },
  },
};
export default destinationcarrangesModule;
