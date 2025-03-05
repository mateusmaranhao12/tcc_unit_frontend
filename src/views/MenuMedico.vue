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
            <button class="btn-ver">Ver</button>
          </div>

          <div class="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
            <span>Consultas do Dia</span>
            <button class="btn-ver">Ver</button>
          </div>

          <div class="flex space-x-4 mt-4">
            <button class="btn-reagendar">Re-agendar Consultas</button>
            <button class="btn-desmarcar">Desmarcar Consultas</button>
          </div>
        </div>
      </div>
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