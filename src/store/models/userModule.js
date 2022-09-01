import CustomizedAxios from "../../plugins/axios";

const userModule = {
  state: {
    users: [],
    useractive: null,
    token: null,
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    LOGIN_USER(state, payload) {
      state.useractive = payload.user;
      state.token = payload.token;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    DELETE_USER(state, user) {
      state.users = state.users.filter((c) => c.id != user.id);
    },
    EDIT_USER(state, user) {
      state.users = state.users.map((c) => {
        if (c.id == user.id) return user;
        return c;
      });
    },
    GET_USERACTIVE(state, useractive) {
      state.useractive = useractive;
    },
  },
  actions: {
    LoginAction({ commit }, user) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("Auth/login", user)
          .then((response) => {
            commit("LOGIN_USER", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logoutAction({ commit }, user) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("users/logout", user)
          .then((response) => {
            commit("LOGIN_USER", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getUsers: (state) => {
      return state.users;
    },
    getUserActive: (state) => {
      return state.useractive;
    },
  },
};
export default userModule;
