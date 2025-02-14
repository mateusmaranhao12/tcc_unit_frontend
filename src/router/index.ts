import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '../views/Index.vue'
import Sobre from '@/views/Sobre.vue'
import Medicos from '@/views/Medicos.vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'index',
    component: Index
  },

  {
    path: '/sobre',
    name: 'sobre',
    component: Sobre
  },

  {
    path: '/medicos',
    name: 'medicos',
    component: Medicos
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
