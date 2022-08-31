import Vue from 'vue'
import VueRouter from 'vue-router'
import CarGestion from '../views/CarGestion.vue'
import CarrangeGestion from '../views/CarrangeGestion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/CarGestion',
    name: 'CarGestion',
    component: CarGestion
  },
  {
    path: '/CarrangeGestion',
    name: 'CarrangeGestion',
    component: CarrangeGestion
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
