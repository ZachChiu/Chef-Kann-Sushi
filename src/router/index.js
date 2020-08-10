import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/admin',
    redirect: '/admin/products'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:
    [
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
        path: 'coupons',
        component: () => import('../views/admin/Coupons.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/Orders.vue')
      },
      {
        path: 'products',
        component: () => import('../views/admin/Products.vue')
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
