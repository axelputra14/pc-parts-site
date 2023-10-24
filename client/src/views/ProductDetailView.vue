<script>
import Sidebar from '../components/Sidebar.vue'
import { mapActions, mapState } from 'pinia'
import { RouterLink } from 'vue-router'
import { useFetchStore } from '../stores/fetch'

export default {
  name: 'ProductDetailView',
  components: { Sidebar },
  methods: {
    ...mapActions(useFetchStore, ['fetchProductById', 'addToWishlist']),
    setVisibility() {
      this.isVisible = true
    }
  },
  computed: {
    ...mapState(useFetchStore, ['quietDetail', 'qrCode'])
  },
  data() {
    return {
      isVisible: false
    }
  },
  created() {
    this.fetchProductById(this.$route.params.id)
  }
}
</script>

<template>
  <div class="body">
    <div class="mainbody">
      <Sidebar />

      <div class="contentbody">
        <div class="product-detail-container">
          <div class="detail-title">
            <h1>{{ quietDetail.name }}</h1>
          </div>

          <img class="detail-img" v-bind:src="quietDetail.imgUrl" />
          <div class="detail-category">
            <h2>{{ quietDetail.Category.name }}</h2>
          </div>

          <h4>{{ quietDetail.description }}</h4>
          <div class="detail-price">
            <p>Price: ${{ quietDetail.price }}</p>
          </div>

          <div class="detail-stock">
            <p>Remaining stock: {{ quietDetail.stock }}</p>
          </div>
        </div>

        <div class="detail-qr-container">
          <div><a href="#" v-on:click.prevent="setVisibility">Share this product!</a></div>

          <div class="detail-qr" v-if="isVisible">
            <img v-bind:src="qrCode" />
          </div>
        </div>
        <div class="detail-wishlist">
          <a href="#" v-on:click="addToWishlist(quietDetail.id)">&#10084; Add to wishlist</a>
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
