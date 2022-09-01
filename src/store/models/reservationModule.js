import CustomizedAxios from "../../plugins/axios";

const reservationModule = {
  state: {
    reservations: [],
  },
  mutations: {
    SET_RESERVATIONS(state, reservations) {
      state.reservations = reservations;
    },
    ADD_RESERVATION(state, reservation) {
      state.reservations.push(reservation);
    },
    DELETE_RESERVATION(state, reservation) {
      state.reservations = state.reservations.filter(
        (c) => c.reservation.id != reservation.id
      );
    },
    EDIT_RESERVATION(state, reservation) {
      state.reservations = state.reservations.map((c) => {
        if (c.id == reservation.id) return reservation;
        return c;
      });
    },
  },
  actions: {
    setRESERVATIONSAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("reservation/")
          .then((response) => {
            commit("SET_RESERVATIONS", response.data.payload);
            console.log("set reservation ");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setRESERVATIONbyIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("reservation/" + id)
          .then((response) => {
            commit("SET_RESERVATIONS", response.data.payload);
            console.log("set reservation ");
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addRESERVATIONAction({ commit }, reservation) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("reservation/create", reservation)
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_RESERVATION", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteRESERVATIONAction({ commit }, reservation) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("reservation/delete", reservation.reservation)
          .then((response) => {
            commit("DELETE_RESERVATION", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editRESERVATIONAction({ commit }, reservation) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("reservation/update", reservation)
          .then((response) => {
            commit("EDIT_RESERVATION", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getReservation: (state) => {
      return state.reservations;
    },
  },
};
export default reservationModule;
