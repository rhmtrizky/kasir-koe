export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    if (store.getters["auth/authenticated"]) {
      config.headers[
        "Authorization"
      ] = `Bearer ${store.state.auth.accessToken} `;
    }
  });

  $axios.onResponseError((error) => {
    console.log(error.response.status);
    if (error.response.status === 401) {
      return $axios
        .$post("/auth/refresh-token", {
          refreshToken: store.state.auth.refreshToken,
        })
        .then((response) => {
          console.log(response);
          store.commit("auth/setAccessToken", response.accessToken);
          store.commit("auth/setRefreshToken", response.refreshToken);

          const originalRequest = error.config;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.accessToken} `;
          return $axios(originalRequest);
        })
        .catch((error) => {
          if (
            error.response.data.message == "REFRESH_TOKEN_EXPIRED" ||
            error.response.data.message == "REFRESH_TOKEN_INVALID"
          ) {
            store.commit("auth/logout");
            return redirect("/login");
          }
        });
    }
  });
}
