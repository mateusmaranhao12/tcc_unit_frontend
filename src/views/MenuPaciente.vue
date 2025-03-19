<template>
  <navbar-paciente />
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800">Olá, Rodolfo José</h1>

      <!-- Seção de Consultas -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold text-gray-700">Consultas</h2>

        <div class="mt-4 space-y-4">
          <div class="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
            <span>Lista de Todas as Consultas</span>
            <button class="btn-ver" @click="$router.push('/menu-paciente/consultas-paciente')">Ver</button>
          </div>
        </div>
      </div>

      <router-view></router-view>

      <!-- Agendar Consulta -->
      <div class="mt-6">

        <div class="mt-4 space-y-4">
          <div class="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
            <span>Agendar consulta</span>
            <button class="btn-ver" @click="$router.push('/agendar-consulta')">Agendar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavbarPaciente from '@/components/NavbarPaciente.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    NavbarPaciente
  }
})
export default class MenuPaciente extends Vue {
}
</script>
