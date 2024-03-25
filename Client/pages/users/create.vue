<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card>
        <v-toolbar color="primary" dark class="text-h5 font-weight-bold"
          >Create User</v-toolbar
        >
        <v-card-text>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0" />
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
            <v-select :items="roles" label="Role" v-model="form.role"
              >Role</v-select
            >
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="onSubmit"
            class="mb-3 mr-3"
            color="primary"
            :disabled="isDisable"
          >
            <span v-if="!isDisable">Save</span>
            <v-progress-circular v-else color="primary" indeterminate>
            </v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ["authenticated"],
  data() {
    return {
      breadcrumbs: [
        { text: "Users", disabled: false, to: "/users", exact: true },
        { text: "Create", disabled: true },
      ],
      message: "",
      isDisable: false,
      alertEmailExist: false,
      roles: ["employee", "admin", "cashier"],
      form: {
        fullname: "",
        email: "",
        password: "",
        retype_password: "",
        role: "",
      },
      rules: {
        role: [(v) => !!v || "Role is required"],
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
        .$post("http://localhost:5000/auth/check-email", this.form)
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
          .$post("http://localhost:5000/users", this.form)
          .then((res) => {
            this.isDisable = false;
            // redirect to page login
            this.$router.push("/users");
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
