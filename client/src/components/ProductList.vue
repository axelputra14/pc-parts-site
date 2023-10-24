<script>
import { mapActions, mapState } from 'pinia'

import { useFetchStore } from '../stores/fetch'

import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'ProductList',
  data() {
    return {
      name_query: '',
      search_query: ''
    }
  },
  components: {
    ProductCard
  },
  methods: {
    ...mapActions(useFetchStore, ['fetchProduct', 'setPage'])
  },
  computed: {
    ...mapState(useFetchStore, ['quiets', 'pageAmount', 'currentPage', 'searchName'])
  },
  created() {
    this.fetchProduct(localStorage.getItem('pageNow'))
  }
}
</script>

<template>
  <!-- <div class="search-box">
    <form class="login-form" v-on:submit.prevent="fetchProduct(1, this.search_query)">
      <label>Search product name: </label>
      <input v-model="this.search_query" type="text" />
      <button action="submit" class="btn-login">Search</button>
    </form>
  </div> -->
  <div class="product-card-container">
    <ProductCard v-for="product in quiets" :productData="product" :key="product.id" />
  </div>

  <div class="pagination">
    <a href="#" v-for="page in pageAmount" v-on:click.prevent="fetchProduct(page), setPage(page)">{{
      page
    }}</a>
  </div>
</template>
