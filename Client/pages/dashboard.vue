<template>
  <v-row>
    <v-col cols="8" class="frame-container px-3">
      <v-card>
        <v-card-title>Dashboard {{ authenticated.fullname }}</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authenticated"],
  head: {
    title: "Dashboard",
  },

  computed: {
    ...mapGetters("auth", {
      authenticated: "authenticated",
      user: "user",
    }),
  },
};
</script>
