<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark class="text-h5 font-weight-bold"
          >Login</v-toolbar
        >
        <v-card-text>
          <v-form>
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
            <p
              v-if="isWrong"
              class="text-caption font-color-red text-lowercase font-italic my-0"
            >
              Email or Password is wrong!!
            </p>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mb-3 mr-3"
            color="primary"
            @click="onSubmit"
            :disabled="isDisable"
          >
            <span v-if="!isDisable">Login</span>
            <v-progress-circular v-else color="primary" indeterminate>
            </v-progress-circular>
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
export default {
  data() {
    return {
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
    onSubmit() {
      this.isDisable = true;
      this.$http
        .$post("http://localhost:5000/auth/login", this.form)
        .then((res) => {
          this.isDisable = false;
          // redirect to page home
          this.isWrong = false;
          this.$router.push("/");
        })
        .catch((err) => {
          this.isDisable = false;
          this.isWrong = true;
        });
    },
  },
};
</script>
