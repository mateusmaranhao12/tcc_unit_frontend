import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cadastro from '@/views/Cadastro.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Medicos from '@/views/Medicos.vue'
import Sobre from '@/views/Sobre.vue'

const routes: Array<RouteRecordRaw> = [

  //index
  {
    path: '/',
    name: 'index',
    component: Index
  },

  //sobre
  {
    path: '/sobre',
    name: 'sobre',
    component: Sobre
  },

  //medicos
  {
    path: '/medicos',
    name: 'medicos',
    component: Medicos
  },

  //cadastro
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro
  },

  //login
  {
    path: '/login',
    name: 'login',
    component: Login
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
