<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useFetchStore } from '../stores/fetch'
export default {
  name: 'RegisterView',
  components: {
    RouterLink
  },
  data() {
    return {
      dataRegister: {
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
      }
    }
  },
  methods: {
    ...mapActions(useFetchStore, ['register']),
    registerHandler() {
      this.register(this.dataRegister)
    }
  }
}
</script>

<template>
  <div class="mainbody">
    <div class="regist-page">
      <div class="menu-item">
        <img class="site-logo" src="../assets/logo.png" alt="Logo" />
      </div>
      <h1>Registration</h1>
      <form class="regist-form" v-on:submit.prevent="registerHandler">
        <label>Email</label>
        <input v-model="dataRegister.email" type="email" />
        <label>Password</label>
        <input v-model="dataRegister.password" type="password" />
        <label>Phone Number</label>
        <input v-model="dataRegister.phoneNumber" type="text" />
        <label>Address</label>
        <input v-model="dataRegister.address" type="text" />
        <p>
          Already have an account? Feel free to
          <RouterLink class="span-orange" to="/login"> login</RouterLink>
        </p>
        <button type="submit" class="btn-login">Register</button>
        <!-- <button type="submit" class="btn-regist">Register</button> -->
        <p>
          Back to
          <RouterLink class="span-orange" to="/"> home</RouterLink> without registering.
        </p>
        <p>You can still browse our page without registering.</p>
        <p>Wishlist function requires user to have an account and log in.</p>
      </form>
    </div>
  </div>
</template>
