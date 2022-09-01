import Vue from 'vue'
import VueRouter from 'vue-router'
import CarGestion from '../views/CarGestion.vue'
import CarrangeGestion from '../views/CarrangeGestion.vue'
import DestinationGestion from '../views/DestinationGestion.vue'
import DestinationcarrangesGestion from '../views/DestinationcarrangesGestion.vue'
import ReservationGestion from '../views/ReservationGestion.vue'

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
  {
    path: '/DestinationGestion',
    name: 'DestinationGestion',
    component: DestinationGestion
  },
  {
    path: '/DestinationcarrangesGestion',
    name: 'DestinationcarrangesGestion',
    component: DestinationcarrangesGestion
  },
  {
    path: '/ReservationGestion',
    name: 'ReservationGestion',
    component: ReservationGestion
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
