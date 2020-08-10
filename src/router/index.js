import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: Layout,
    children:
    [
      {
        path: '',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/about',
        component: () => import('../views/About.vue')
      },
      {
        path: '/products',
        component: () => import('../views/Products.vue')
      },
      {
        path: '/product/:id',
        component: () => import('../views/Product.vue')
      },
      {
        path: '/login',
        component: () => import('../views/Login.vue')
      },
      {
        path: '/cart',
        component: () => import('../views/Cart.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard'),
    children:
    [
      {
        path: '',
        name: 'admin',
        component: () => import('../views/admin/Products.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/Coupons.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/Orders.vue')
      },

      {
        path: 'storage',
        component: () => import('../views/admin/Storage.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
