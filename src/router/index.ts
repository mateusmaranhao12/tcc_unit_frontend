import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AgendarConsulta from '@/views/AgendarConsulta.vue'
import AlterarDadosPerfilMedico from '@/views/AlterarDadosPerfilMedico.vue'
import AlterarDadosPerfilPaciente from '@/views/AlterarDadosPerfilPaciente.vue'
import Cadastro from '@/views/Cadastro.vue'
import ConsultasMedico from '@/components/ConsultasMedico.vue'
import ConsultasPaciente from '@/components/ConsultasPaciente.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Medicos from '@/views/Medicos.vue'
import MenuMedico from '@/views/MenuMedico.vue'
import MenuPaciente from '@/views/MenuPaciente.vue'
import Sobre from '@/views/Sobre.vue'

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
        path: 'consultas-medico',
        name: 'consultas-medico',
        component: ConsultasMedico
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
    },
    children: [
      {
        path: 'consultas-paciente',
        name: 'consultas-paciente',
        component: ConsultasPaciente
      }
    ]
  },

  //Dados perfil medico
  {
    path: '/alterar-dados-perfil-medico',
    name: 'alterar-dados-perfil-medico',
    component: AlterarDadosPerfilMedico,
    beforeEnter: (to, from, next) => {
      if (isAuthenticatedMedico()) {
        next();
      } else {
        next('/login');
      }
    }
  },

  //Dados perfil paciente
  {
    path: '/alterar-dados-perfil-paciente',
    name: 'alterar-dados-perfil-paciente',
    component: AlterarDadosPerfilPaciente,
    beforeEnter: (to, from, next) => {
      if (isAuthenticatedPaciente()) {
        next();
      } else {
        next('/login')
      }
    }
  },

  //Agendar consulta
  {
    path: '/agendar-consulta',
    name: 'agendar-consulta',
    component: AgendarConsulta,
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
