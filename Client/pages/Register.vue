<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark class="text-h5 font-weight-bold"
          >Register</v-toolbar
        >
        <v-card-text>
          <v-form>
            <v-text-field name="name" label="Full Name" type="text" />
            <v-text-field name="email" label="Email" type="email" />
            <v-text-field name="password" label="Password" type="password" />
            <v-text-field
              name="repasowrd"
              label="Confirm Password"
              type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mb-3 mr-3" color="primary">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
