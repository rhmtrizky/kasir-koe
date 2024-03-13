<template>
  <v-app dark>
    <v-navigation-drawer v-model="sideDrawer" :mini-variant="miniVariant" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          :disabled="isDisabled(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
    </v-app-bar> -->
    <v-main>
      <v-container fill-height fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation horizontal fixed app>
      <v-app-bar-nav-icon
        @click.stop="sideDrawer = !sideDrawer"
        v-ripple="false"
        plain
      />
      <v-btn
        v-for="(item, i) in bottomMenu"
        :key="i"
        :to="item.to"
        v-ripple="false"
        plain
      >
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
      <v-spacer />
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DefaultLayout",
  data() {
    return {
      isDisable: true,
      sideDrawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-account",
          title: "Account",
          to: "/account",
        },
        {
          icon: "mdi-bell",
          title: "Notification",
          to: "/notification",
        },
        {
          icon: "mdi-login",
          title: "Login",
          to: "/login",
        },
        {
          icon: "mdi-logout",
          title: "Logout",
          to: "/logout",
        },
      ],
      bottomMenu: [
        {
          icon: "mdi-application",
          title: "App",
          to: "/",
        },
      ],
      miniVariant: false,
    };
  },
  methods: {
    isWelcomeScreen() {
      if (!localStorage.welcomeScreen) {
        if (
          this.$router.currentRoute.path !== "/register" &&
          this.$router.currentRoute.path !== "/login"
        )
          return this.$router.push("/register");
      }
    },
    isDisabled(item) {
      if (this.authenticated && item === "/login") {
        return this.isDisable;
      }
      if (!this.authenticated && item === "/logout") {
        return this.isDisable;
      }
      return false;
    },
  },
  watch: {
    $route() {
      this.isWelcomeScreen();
    },
  },
  mounted() {
    // localStorage.setItem("welcomeScreen", true);
    this.isWelcomeScreen();
  },
  computed: {
    ...mapGetters("auth", {
      authenticated: "authenticated",
    }),
  },
};
</script>
