<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark class="text-h5 font-weight-bold"
          >Login</v-toolbar
        >
        <v-card-text>
          <v-form>
            <v-text-field name="email" label="example@gmail.com" type="email" />
            <v-text-field name="password" label="Password" type="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mb-3 mr-3" color="primary">Login</v-btn>
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
