import CustomizedAxios from "../../plugins/axios";

const carModule = {
  state: {
    cars: [],
  },
  mutations: {
    SET_CARS(state, cars) {
      state.cars = cars;
    },
    ADD_CAR(state, car) {
      state.cars.push(car);
    },
    DELETE_CAR(state, car) {
      state.cars = state.cars.filter((c) => c.id != car.id);
    },
    EDIT_CAR(state, car) {
      state.cars = state.cars.map((c) => {
        if (c.id == car.id) return car;
        return c;
      });
    },
  },
  actions: {
    setCARSAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("car/")
          .then((response) => {
            commit("SET_CARS", response.data.payload);
            console.log("set car ");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setCARbyIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("car/" + id)
          .then((response) => {
            commit("SET_CARS", response.data.payload);
            console.log("set car ");
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addCARAction({ commit }, car) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("car/create", car)
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_CAR", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteCARAction({ commit }, car) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("car/delete", car)
          .then((response) => {
            commit("DELETE_CAR", car);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editCARAction({ commit }, car) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("car/update", car)
          .then((response) => {
            commit("EDIT_CAR", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getCars: (state) => {
      return state.cars;
    },
  },
};
export default carModule;
