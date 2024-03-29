export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.getters["auth/authenticated"]) {
      config.headers[
        "Authorization"
      ] = `Bearer ${store.state.auth.accessToken} `;
    }
  });

  $axios.onError((error) => {
    if (error.response.status == 401) {
      return $axios
        .$post("/auth/refresh-token", {
          refreshToken: store.state.auth.refreshToken,
        })
        .then((response) => {
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
            error.response.data.message == "REFRESH_TOKEN_EXPRIRED" ||
            error.response.data.message == "REFRESH_TOKEN_INVALID"
          ) {
            store.commit("auth/logout");
            return redirect("/login");
          }
        });
    }
  });
}
