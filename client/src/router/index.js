import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import WishlistView from '../views/WishlistView.vue'
import Swal from 'sweetalert2'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: HomeView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        if (localStorage.access_token) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        if (localStorage.access_token) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/product/:id',
      name: 'productDetail',
      component: ProductDetailView
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView,
      beforeEnter: (to, from, next) => {
        if (localStorage.access_token) {
          next()
        } else {
          Swal.fire({
            title: 'Please login first!',
            icon: 'error',
            confirmButtonText: 'Close'
          })
          next('/')
        }
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name == 'NotFound') {
    next('/')
  } else {
    next()
  }
})

export default router
