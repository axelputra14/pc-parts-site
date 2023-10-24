<script>
import Sidebar from '../components/Sidebar.vue'
import ProductList from '../components/ProductList.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    ProductList
  }
}
</script>

<template>
  <div class="body">
    <div class="mainbody">
      <Sidebar />

      <div class="contentbody">
        <div class="page-title">
          <h2>Check our awesome products</h2>
        </div>

        <ProductList />
      </div>
    </div>
  </div>
</template>
