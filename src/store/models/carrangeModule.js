import CustomizedAxios from "../../plugins/axios";

const carrangeModule = {
  state: {
    carrangs: [],
  },
  mutations: {
    SET_CARRANGS(state, carrangs) {
      state.carrangs = carrangs;
    },
    ADD_CARRANG(state, carrang) {
      state.carrangs.push(carrang);
    },
    DELETE_CARRANG(state, carrang) {
      state.carrangs = state.carrangs.filter((c) => c.id != carrang.id);
    },
    EDIT_CARRANG(state, carrang) {
      state.carrangs = state.carrangs.map((c) => {
        if (c.id == carrang.id) return carrang;
        return c;
      });
    },
  },
  actions: {
    setCARRANGSAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("carrange")
          .then((response) => {
            commit("SET_CARRANGS", response.data.payload);
            console.log("set carrang ");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setCARRANGbyIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("carrange/" + id)
          .then((response) => {
            commit("SET_CARRANGS", response.data.payload);
            console.log("set carrang ");
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addCARRANGAction({ commit }, carrang) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("carrange/create", carrang)
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_CARRANG", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteCARRANGAction({ commit }, carrang) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("carrange/delete", carrang)
          .then((response) => {
            commit("DELETE_CARRANG", carrang);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editCARRANGAction({ commit }, carrang) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("carrange/update", carrang)
          .then((response) => {
            commit("EDIT_CARRANG", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getCarranges: (state) => {
      return state.carrangs;
    },
  },
};
export default carrangeModule;
