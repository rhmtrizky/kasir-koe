<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark class="text-h5 font-weight-bold"
          >Register</v-toolbar
        >
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              name="fullname"
              label="Full Name"
              type="text"
              :rules="rules.fullname"
              v-model="form.fullname"
            />
            <v-text-field
              name="email"
              label="Email"
              type="email"
              :rules="rules.email"
              v-model="form.email"
              @keyup="checkEmail"
            />
            <p
              v-if="alertEmailExist"
              class="text-caption font-color-red text-lowercase font-italic my-0"
            >
              {{ message }}
            </p>
            <v-text-field
              name="password"
              label="Password"
              type="password"
              :rules="rules.password"
              v-model="form.password"
            />
            <v-text-field
              name="retype_pasword"
              label="Confirm Password"
              type="password"
              :rules="rules.retype_password"
              v-model="form.retype_password"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="onSubmit"
            class="mb-3 mr-3"
            color="primary"
            :loading="isDisable"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>
        Kamu sudah punya akun?
        <v-btn
          to="/login"
          plain
          class="text-body-1 pl-0 text-capitalize font-italic"
          color="blue"
          >Login</v-btn
        >
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ["unauthenticated"],
  head: {
    title: "Register",
  },
  data() {
    return {
      message: "",
      isDisable: false,
      alertEmailExist: false,
      form: {
        fullname: "",
        email: "",
        password: "",
        retype_password: "",
      },
      rules: {
        fullname: [(v) => !!v || "Fullname is required"],
        email: [
          (v) => !!v || "Email is required",
          (v) => /.+@.+/.test(v) || "Email invalid",
        ],
        password: [
          (v) => !!v || "Password is required",
          (v) =>
            (v && v.length >= 6) ||
            "Password must be greater than 6 characters",
        ],
        retype_password: [
          (v) => v === this.form.password || "Password does not match",
        ],
      },
    };
  },
  methods: {
    checkEmail() {
      this.$axios
        .$post("/auth/check-email", this.form)
        .then((res) => {
          this.alertEmailExist = false;
        })
        .catch((err) => {
          this.message = err.response.data.message;
          this.alertEmailExist = true;
        });
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.isDisable = true;
        this.$axios
          .$post("/auth/register", this.form)
          .then((res) => {
            this.isDisable = false;
            // redirect to page login
            this.$router.push("/login");
          })
          .catch((err) => {
            this.isDisable = false;
            this.$refs.form.validate();
          });
      }
    },
  },
};
</script>
