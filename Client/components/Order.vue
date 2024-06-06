<template>
  <v-row cols="12">
    <v-col>
      <h2>Order</h2>
      <v-list>
        <v-list-item v-for="(item, index) in cartItems" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle class="d-flex">
              {{ currency(item.price) }}
              <div class="ml-5">
                <v-btn x-small icon color="primary" @click="decrement(item.id)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                x{{ item.quantity }}
                <v-btn x-small icon color="primary" @click="increment(item.id)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn x-small icon color="error" @click="removeItem(item.id)">
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
            <v-list-item-subtitle>{{
              currency(itemTotal(item.price, item.quantity))
            }}</v-list-item-subtitle>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-if="items.length"
          class="text-h6 black--text grey lighten-2"
        >
          <v-list-item-content>
            <v-list-item-title>Sub Total</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-title>{{ currency(subTotal) }}</v-list-item-title>
          </v-list-item-action>
        </v-list-item>
        <v-list-group v-if="items.length" class="text--black grey lighten-3">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Additionals</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(additional, index) in additionals" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ additional.title }}</v-list-item-title>
              <v-list-item-subtitle v-if="additional.mode == 'percentage'"
                >{{ additional.value }}%</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-title v-if="additional.mode == 'fix'">{{
                currency(additional.value)
              }}</v-list-item-title>
              <v-list-item-title v-else-if="additional.mode == 'percentage'">{{
                currency(calculatePercentage(additional.value))
              }}</v-list-item-title>
            </v-list-item-action>
          </v-list-item>
          <v-list-item
            v-if="items.length"
            class="text-h6 black--text grey lighten-2"
          >
            <v-list-item-content>
              <v-list-item-title>Total</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-title>{{ currency(total) }}</v-list-item-title>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
      <div class="d-flex justify-end width-full mt-5">
        <v-form ref="form" @submit.prevent="onSubmit" v-if="items.length">
          <v-btn color="primary" @click="onSubmit">Submit Order</v-btn>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      items1: [],
    };
  },
  methods: {
    ...mapActions("carts", {
      increment: "increment",
      decrement: "decrement",
      removeItem: "removeItem",
      clearCart: "clearCart",
    }),
    currency(value) {
      return Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    async onSubmit() {
      // Check if form is valid
      if (this.$refs.form.validate()) {
        // this.isDisable = true; // Disable the button to prevent multiple submissions
        try {
          // Extract product IDs from cart items
          const productIds = this.cartItems.map((item) => item.id);

          // Send a POST request to the server with the product IDs
          const res = await this.$axios.$post("/orders", { productIds });
          console.log(res);

          if (res) {
            this.clearCart();
          }
          // this.isDisable = false;

          // Redirect to the orders page with a success message
          // this.$router.push({
          //   name: "orders",
          //   params: {
          //     message: "ORDER_SUBMITTED_SUCCESS",
          //     orderNumber: res.order.orderNumber,
          //   },
          // });
        } catch (err) {
          // this.isDisable = false;
          console.error(err);
          // Handle error and show appropriate message to user
        }
      }
    },
  },

  computed: {
    ...mapState("carts", {
      items: "items",
      additionals: "additionals",
    }),
    ...mapGetters("carts", {
      cartItems: "cartItems",
      itemTotal: "itemTotal",
      subTotal: "subTotal",
      calculatePercentage: "calculatePercentage",
      total: "total",
    }),
  },
};
</script>
