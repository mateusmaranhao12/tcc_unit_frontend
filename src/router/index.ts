import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cadastro from '@/views/Cadastro.vue'
import ConsultasDoDia from '@/components/ConsultasDoDia.vue'
import ConsultasFuturas from '@/components/ConsultasFuturas.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Medicos from '@/views/Medicos.vue'
import Sobre from '@/views/Sobre.vue'
import MenuMedico from '@/views/MenuMedico.vue'
import MenuPaciente from '@/views/MenuPaciente.vue'

const isAuthenticatedMedico = () => {
  return localStorage.getItem('userRole') === 'medico'
}

const isAuthenticatedPaciente = () => {
  return localStorage.getItem('userRole') === 'paciente'
}

export const logout = () => {
  console.log('fazer logout')
  localStorage.removeItem('userRole')
  localStorage.removeItem('authToken')
  window.location.href = '/login'
}

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
  },

  //Menu Medico - Protegido
  {
    path: '/menu-medico',
    name: 'menu-medico',
    component: MenuMedico,
    beforeEnter: (to, from, next) => {
      if (isAuthenticatedMedico()) {
        next();
      } else {
        next('/login');
      }
    },
    children: [
      {
        path: 'consultas-do-dia',
        name: 'consultas-do-dia',
        component: ConsultasDoDia
      },
      {
        path: 'consultas-futuras',
        name: 'consultas-futuras',
        component: ConsultasFuturas
      }
    ]
  },

  //Menu Paciente - Protegido
  {
    path: '/menu-paciente',
    name: 'menu-paciente',
    component: MenuPaciente,
    beforeEnter: (to, from, next) => {
      if (isAuthenticatedPaciente()) {
        next();
      } else {
        next('/login')
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
