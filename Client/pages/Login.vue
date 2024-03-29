<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark class="text-h5 font-weight-bold"
          >Login</v-toolbar
        >
        <v-card-text>
          <v-form>
            <v-alert type="error" v-if="isWrong">{{ message }}</v-alert>
            <v-text-field
              name="email"
              label="Email"
              type="email"
              :rules="rules.email"
              v-model="form.email"
            />
            <v-text-field
              name="password"
              label="Password"
              type="password"
              :rules="rules.password"
              v-model="form.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn
            class="mb-3 mr-3"
            color="primary"
            @click="onSubmit"
            :disabled="isDisable"
          >
            <span v-if="!isDisable">Login</span>
            <v-progress-circular v-else color="primary" indeterminate>
            </v-progress-circular>
          </v-btn> -->
          <v-btn
            class="mb-3 mr-3"
            color="primary"
            @click="onSubmit"
            :loading="isDisable"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>
        Kamu belum punya akun?
        <v-btn
          to="/register"
          plain
          class="text-body-1 pl-0 text-capitalize font-italic"
          color="blue"
          >Register</v-btn
        >
      </p>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  // middleware: ["unauthenticated"],
  head: {
    title: "Login",
  },
  data() {
    return {
      message: "",
      isDisable: false,
      isWrong: false,
      form: {
        email: "",
        password: "",
      },
      rules: {
        email: [(v) => !!v || "Email is required"],
        password: [(v) => !!v || "Password is required"],
      },
    };
  },
  methods: {
    ...mapMutations("auth", {
      setFullname: "setFullname",
      setAccessToken: "setAccessToken",
      setRefreshToken: "setRefreshToken",
    }),
    storeWelcomeScreen() {
      localStorage.setItem("welcomeScreen", true);
    },
    alertError() {
      this.isWrong = true;
      setTimeout(() => {
        this.isWrong = false;
      }, 3000);
    },
    onSubmit() {
      this.isDisable = true;
      this.$axios
        .$post("/auth/login", this.form)
        .then((res) => {
          //persited state
          this.setFullname(res.fullname);
          this.setAccessToken(res.accessToken);
          this.setRefreshToken(res.refreshToken);

          // store welcome screen
          if (!localStorage.welcomeScreen) {
            this.storeWelcomeScreen();
          }
          //disable button
          this.isDisable = false;
          // redirect to page home
          this.isWrong = false;
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          this.message = err.response.data.message;
          this.isDisable = false;
          this.alertError();
        });
    },
  },
  mounted() {
    if (this.$route.params.message == "AUTH_REQUIRED") {
      this.message = "Please, you must login first";
      this.alertError();
    }
  },
};
</script>
