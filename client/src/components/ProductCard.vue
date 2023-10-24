<script>
export default {
  name: 'ProductCard',
  props: ['productData'],
  methods: {
    getProductDetail(id) {
      this.$router.push({ name: 'productDetail', params: { id } })
    }
  }
}
</script>

<template>
  <div class="card-container" v-on:click="getProductDetail(productData.id)">
    <div class="card-img-container">
      <img class="product-img-thumb" v-bind:src="productData.imgUrl" />
    </div>
    <div class="product-title-container">
      <p class="product-title">{{ productData.name }}</p>
    </div>
    <div class="product-line">
      <hr class="hr-line" />
    </div>

    <p class="product-category">{{ productData.Category.name }}</p>
    <p class="product-price">${{ productData.price }}</p>
    <div class="product-popbox"><p>Check detail</p></div>
    <!-- <button >Detail</button> -->
  </div>
</template>
