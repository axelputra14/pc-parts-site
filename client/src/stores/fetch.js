import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import quietInstance from '../apis/quiet'
import Swal from 'sweetalert2'

import router from '../router'

export const useFetchStore = defineStore({
  id: 'fetch',
  state() {
    return {
      quiets: [],
      quietDetail: {},
      wishlist: [],
      pageAmount: 1,
      currentPage: 1,
      isLogin: false,
      qrCode: ''
      // searchName: ''
    }
  },
  actions: {
    setPage(newPage) {
      this.currentPage = newPage
      localStorage.setItem('pageNow', newPage)
    },

    async fetchProduct(page) {
      try {
        const response = await quietInstance.get('/pub/product', {
          params: {
            page: page
          }
        })

        this.quiets = response.data.data
        this.pageAmount = response.data.pageAmount
        router.push({ path: '/', query: { page: page } })
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    },

    async fetchProductById(id) {
      try {
        const response = await quietInstance.get(`/pub/product/${id}`)
        this.quietDetail = response.data.data

        this.qrCode = response.data.qr
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    },

    async fetchWishlist() {
      try {
        // get id logged in belom
        const response = await quietInstance.get('/pub/wishlist', {
          headers: { access_token: localStorage.access_token }
        })

        this.wishlist = response.data.data
        // console.log(response.data.data, 'ini data')
      } catch (err) {
        Swal.fire({
          title: `You haven't logged in!`,
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    },

    async addToWishlist(id) {
      try {
        await quietInstance.post(
          `/pub/wishlist/${id}`,
          {
            CustomerId: localStorage.access_token.id,
            ProductId: id
          },
          { headers: { access_token: localStorage.access_token } }
        )
        Swal.fire({
          title: `Added to wishlist`,
          icon: 'success',
          confirmButtonText: 'Yay!'
        })
      } catch (err) {
        Swal.fire({
          title: `Failed to add to wishlist`,
          text: 'Please login first to access wishlist feature',
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    },

    async register(dataRegister) {
      try {
        const response = await quietInstance.post('/pub/register', {
          email: dataRegister.email,
          password: dataRegister.password,
          phoneNumber: dataRegister.phoneNumber,
          address: dataRegister.address
        })
        Swal.fire({
          title: `Register success`,
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'Okay!'
        })
        router.push({ name: 'home' })
      } catch (err) {
        Swal.fire({
          title: `Failed to register`,
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    },

    async login(dataLogin) {
      try {
        const response = await quietInstance.post('pub/login', {
          email: dataLogin.email,
          password: dataLogin.password
        })

        localStorage.setItem('access_token', response.data.access_token)

        Swal.fire({
          title: `Welcome to the quiet!`,
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'Yay!'
        })
        this.isLogin = true
        router.push({ name: 'home' })
      } catch (err) {
        Swal.fire({
          title: `Wrong login credentials`,
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    },

    logout() {
      localStorage.removeItem('access_token')
      Swal.fire({
        title: `Logged out`,
        icon: 'success',
        confirmButtonText: 'Close'
      })
      this.isLogin = false
    },

    setIsLogin() {
      this.isLogin = true
    },

    async generateQR() {
      const response = await axios.get('https://api.qr-code-generator.com/v1/create', {
        params: {
          access_token: '-D3YNkkH9sgRYfymkwFzjrD8Nlt0xd5KZEWRoX2okA3rYypdmsX_D9ZMCmD1p34d'
        }
      })
    }
  }
})
