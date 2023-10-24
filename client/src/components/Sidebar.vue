<script>
import SideButtons from './SideButtons.vue'
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useFetchStore } from '../stores/fetch'
export default {
  name: 'Sidebar',
  components: {
    RouterLink,
    SideButtons
  },
  methods: {
    ...mapActions(useFetchStore, ['logout', 'setIsLogin']),
    logoutHandler() {
      this.logout()
    }
  },
  computed: {
    ...mapState(useFetchStore, ['isLogin'])
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.setIsLogin()
    }
  }
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-row1">
      <div class="menu-item">
        <img class="site-logo" src="../assets/logo.png" alt="Logo" />
      </div>

      <div class="menu-item2">
        <div style="--clr: #ee7e00">
          <RouterLink to="/" data-text="&nbsp;HOME">&nbsp;HOME</RouterLink>
        </div>
      </div>
      <div class="menu-item2" v-if="isLogin">
        <div style="--clr: #ffd700">
          <RouterLink to="/wishlist" data-text="&nbsp;WISHLIST">&nbsp;WISHLIST</RouterLink>
        </div>
      </div>
      <div class="menu-item2" v-if="!isLogin">
        <div style="--clr: #00a751">
          <RouterLink to="/login" data-text="&nbsp;LOGIN">&nbsp;LOGIN</RouterLink>
        </div>
      </div>
      <div class="menu-item2" v-if="isLogin">
        <div style="--clr: #dd0000">
          <RouterLink to="/" data-text="&nbsp;LOGOUT" v-on:click.prevent="logoutHandler"
            >&nbsp;LOGOUT</RouterLink
          >
        </div>
      </div>
      <div class="menu-item2" v-if="!isLogin">
        <div style="--clr: #00a0fa">
          <RouterLink to="/register" data-text="&nbsp;REGISTER">&nbsp;REGISTER</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
