export const state = () => ({
  fullname: null,
  accessToken: null,
  refreshToken: null,
});

export const getters = {
  authenticated(state) {
    if (state.accessToken) {
      return true;
    }
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
