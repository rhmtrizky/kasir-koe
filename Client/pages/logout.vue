<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-card-title class="d-flex justify-center"
          >Logout
          <v-icon class="ml-2 spin-loading">mdi-loading</v-icon></v-card-title
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  middleware: ["authenticated"],
  head: {
    title: "Logout",
  },
  methods: {
    ...mapMutations("auth", {
      setFullname: "setFullname",
      setAccessToken: "setAccessToken",
      setRefreshToken: "setRefreshToken",
    }),
  },
  mounted() {
    setTimeout(() => {
      this.setFullname(null);
      this.setAccessToken(null);
      this.setRefreshToken(null);
      this.$router.push("/login");
    }, 2000);
  },
};
</script>
