import Vue from 'vue'
import VueRouter from 'vue-router'
import CarGestion from '../views/CarGestion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/CarGestion',
    name: 'CarGestion',
    component: CarGestion
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
