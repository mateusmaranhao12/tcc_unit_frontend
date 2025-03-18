<template>
  <navbar-medico />
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800">Olá, Mateus Maranhão</h1>

      <!-- Seção de Consultas -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold text-gray-700">Consultas</h2>

        <div class="mt-4 space-y-4">
          <div class="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
            <span>Consultas Futuras</span>
            <button class="btn-ver" @click="$router.push('/menu-medico/consultas-futuras')">Ver</button>
          </div>

          <div class="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
            <span>Consultas do Dia</span>
            <button class="btn-ver" @click="$router.push('/menu-medico/consultas-do-dia')">Ver</button>
          </div>
        </div>
      </div>
      <router-view v-if="$route.name === 'consultas-do-dia' || $route.name === 'consultas-futuras'"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import NavbarMedico from '@/components/NavbarMedico.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    NavbarMedico
  }
})
export default class MenuMedico extends Vue {
}
</script>