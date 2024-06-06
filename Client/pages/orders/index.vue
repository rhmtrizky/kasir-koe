<template>
  <v-row class="frame-container">
    <v-col cols="10" offset="1">
      <v-card>
        <v-toolbar color="primary" dark class="text-h5 font-weight-bold"
          >orders

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>
        </v-toolbar>

        <v-card-text>
          <v-alert v-if="alert.show" :type="alert.type">{{
            alert.message
          }}</v-alert>
          <div class="d-flex mb-4">
            <v-breadcrumbs :items="breadcrumbs" class="pa-0" />
            <v-spacer></v-spacer>
            <v-btn to="/orders/create" color="primary" ele elevation="3" small
              >User <v-icon right>mdi-plus-circle</v-icon></v-btn
            >
          </div>

          <v-data-table
            :headers="headers"
            :items="orders"
            :loading="isLoading"
            :server-items-length="totalData"
            :options.sync="options"
            :search.sync="search"
            :items-per-page="10"
            :footer-props="{ itemsPerPageOptions: [10, 20, 30] }"
          >
            <template v-slot:item.products="{ item }">
              <span
                v-for="(product, index) in item.productIds"
                :key="product._id"
              >
                {{ product.title }}
                <span v-if="index !== item.productIds.length - 1">, </span>
              </span>
            </template>
            <template v-slot:top>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title
                    >Are you sure to delete
                    <strong class="text-indigo-darken-2 ml-1">{{
                      orderItem.orderNumber
                    }}</strong
                    >?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="closeDialog"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="primary"
                      text
                      @click="deleteConfirm(orderItem._id)"
                      >Delete</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn :to="`/orders/edit/${item._id}`" icon
                ><v-icon class="small">mdi-pencil</v-icon></v-btn
              >
              <v-btn icon small
                ><v-icon class="small" @click="deleteUser(item)"
                  >mdi-delete</v-icon
                ></v-btn
              >
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ["authenticated"],
  head: {
    title: "orders Management",
  },
  data() {
    return {
      alert: {
        show: false,
        type: "",
        message: "",
      },
      orderItem: {},
      dialogDelete: false,
      isLoading: false,
      search: "",
      options: {},
      orders: [],
      totalData: 0,
      headers: [
        // { text: "No.", value: "row", sortable: false },
        { text: "Order Id", value: "orderNumber", sortable: false },
        { text: "Products", value: "products", sortable: false },
        { text: "status", value: "status", sortable: false },
        { text: "", value: "actions", sortable: false },
      ],
      breadcrumbs: [
        {
          text: "orders",
          disabled: true,
        },
        {
          text: "Create",
          disabled: false,
          to: "/orders/create",
          exact: true,
        },
      ],
    };
  },
  methods: {
    fetchOrders() {
      const { page, itemsPerPage } = this.options;
      this.isLoading = true;
      this.$axios
        .$get(
          `/orders?page=${page}&limit=${itemsPerPage}&search=${this.search}`
        )
        .then((response) => {
          this.isLoading = false;
          this.orders = response.orders;
          this.totalData = response.orders.total;

          let startItem = response.orders.pagingCounter;
          this.orders.map((order) => (order.row = startItem++));
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },
    deleteConfirm(id) {
      this.$axios
        .$delete(`/orders/${id}`)
        .then((res) => {
          this.dialogDelete = false;
          this.fetchOrders();
          this.alert = {
            show: true,
            type: "success",
            message: `Success delete data ${res.order.orderNumber}`,
          };
          setTimeout(() => {
            this.alert.show = false;
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          this.dialogDelete = false;
        });
    },
    deleteUser(item) {
      this.dialogDelete = true;
      this.orderItem = item;
    },
    closeDialog() {
      this.dialogDelete = false;
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchOrders();
      },
      deep: true,
    },
    search: {
      handler() {
        this.fetchOrders();
      },
    },
  },
  mounted() {
    if (this.$route.params.message == "USER_UPDATE_SUCCESS") {
      this.alert = {
        show: true,
        type: "success",
        message: `Success Update data ${this.$route.params.fullname}`,
      };
      setTimeout(() => {
        this.alert.show = false;
      }, 3000);
    } else if (this.$route.params.message == "USER_DELETE_FAILED") {
      this.alert = {
        show: true,
        type: "error",
        message: `Failed Update data ${this.$route.params.fullname}`,
      };
      setTimeout(() => {
        this.alert.show = false;
      }, 3000);
    } else if (this.$route.params.message == "USER_REGISTER_SUCCESS") {
      this.alert = {
        show: true,
        type: "success",
        message: `Success Register data ${this.$route.params.fullname}`,
      };
      setTimeout(() => {
        this.alert.show = false;
      }, 3000);
    }
  },
};
</script>
