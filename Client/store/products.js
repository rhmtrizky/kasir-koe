export const state = () => ({
  products: [],
  categories: [{ _id: false, title: "All" }],
  categoryId: 0,
});

export const mutations = {
  updateCategoryId(state, categoryId) {
    state.categoryId = categoryId;
  },
  updateProducts(state, products) {
    state.products = products;
  },
  updateCategories(state, categories) {
    state.categories.push(...categories);
  },
};

export const actions = {
  updateCategoryId({ commit }, categoryId) {
    commit("updateCategoryId", categoryId);
  },
  fetchProducts({ commit }) {
    return this.$http
      .$get("http://localhost:5000/products")
      .then((response) => {
        commit("updateProducts", response.products);
      });
  },
  fetchCategories({ commit }) {
    return this.$http
      .$get("http://localhost:5000/categories")
      .then((response) => {
        commit("updateCategories", response.categories);
      });
  },
};
