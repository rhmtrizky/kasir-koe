export default function ({ store }) {
  if (store.getters["auth/authenticated"]) {
    return window.$nuxt.$router.push({
      name: "index",
    });
  }
}
