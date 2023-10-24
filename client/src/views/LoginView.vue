<script>
import { mapActions, mapState } from 'pinia'

import { useFetchStore } from '../stores/fetch'
export default {
  name: 'LoginView',
  data() {
    return {
      dataLogin: { email: '', password: '' }
    }
  },
  methods: {
    ...mapActions(useFetchStore, ['login']),
    loginHandler() {
      this.login(this.dataLogin)
    }
  }
}
</script>

<template>
  <div class="mainbody">
    <div class="login-page">
      <div class="menu-item">
        <img class="site-logo" src="../assets/logo.png" alt="Logo" />
      </div>
      <h1>Login</h1>
      <form class="login-form" v-on:submit.prevent="loginHandler">
        <label>Email</label>
        <input v-model="dataLogin.email" type="email" />
        <label>Password</label>
        <input v-model="dataLogin.password" type="password" />
        <p>
          Don't have an account?
          <RouterLink class="span-orange" to="/register"> Register </RouterLink>
          first
        </p>
        <button type="submit" class="btn-login">Login</button>
        <p>
          Back to
          <RouterLink class="span-orange" to="/"> home</RouterLink> without login.
        </p>
        <p>You can still use our page without logging in.</p>
        <p>Wishlist function requires user to have an account and log in.</p>
      </form>
    </div>
  </div>
</template>
