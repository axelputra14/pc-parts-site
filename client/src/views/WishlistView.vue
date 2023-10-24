<script>
import { mapActions, mapState } from 'pinia'

import { useFetchStore } from '../stores/fetch'

// import ProductCard from '../components/ProductCard.vue'
import WishlistCard from '../components/WishlistCard.vue'
import Sidebar from '../components/Sidebar.vue'
export default {
  name: 'WishlistView',
  components: {
    WishlistCard,
    Sidebar
  },
  methods: {
    ...mapActions(useFetchStore, ['fetchWishlist'])
  },
  computed: {
    ...mapState(useFetchStore, ['wishlist'])
  },
  created() {
    // console.log(this.wishlist, 'ini wishlist')
    this.fetchWishlist()
  }
}
</script>

<template>
  <div class="body">
    <div class="mainbody">
      <Sidebar />

      <div class="contentbody">
        <div class="page-title">
          <h2>Your wishlist</h2>
        </div>

        <div class="product-card-container">
          <WishlistCard v-for="wish in wishlist" :productData="wish.Product" :key="wish.id" />
        </div>
        <div class="detail-back">
          <Transition>
            <RouterLink to="/"><span>&#8592;</span> Back</RouterLink>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
