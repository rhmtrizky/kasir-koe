<template>
  <v-row>
    <v-col cols="8" class="frame-container px-3">
      <v-card>
        <v-card-title>Dashboard</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ["authenticated"],
  head: {
    title: "Dashboard",
  },
};
</script>
