import { jwtDecode } from "jwt-decode";

export const state = () => ({
  fullname: null,
  accessToken: null,
  refreshToken: null,
});

export const getters = {
  authenticated: (state) => {
    if (state.accessToken) {
      return {
        fullname: state.fullname,
        status: true,
      };
    }
    return false;
  },
  user: (state) => {
    if (state.accessToken) {
      return jwtDecode(state.accessToken);
    }
    return false;
  },
};

export const mutations = {
  setFullname(state, fullname) {
    state.fullname = fullname;
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
};
