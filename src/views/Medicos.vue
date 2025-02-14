<template>
  <NavbarIndex />
  <div class="medicos">
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold text-center">Médicos</h1>

      <!-- Lista de Médicos -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div v-for="(medico, index) in medicos" :key="index" class="card-medico bg-white p-6 rounded-lg shadow text-center">
          <img :src="require(`../assets/imgs/${medico.imagem}.png`)" alt="Foto do Médico"
            class="w-32 h-32 mx-auto rounded-full mb-4">
          <h2 class="text-xl font-semibold text-gray-800">{{ medico.nome }}</h2>
          <p class="text-gray-600">{{ medico.especialidade }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavbarIndex from '@/components/NavbarIndex.vue';

@Options({
  components: {
    NavbarIndex
  },
})
export default class Medicos extends Vue {
  medicos = [
    { nome: 'Dr. Lucas Rafael', especialidade: 'Cardiologista', imagem: 'user3' },
    { nome: 'Dra. Yali Maria', especialidade: 'Dermatologista', imagem: 'user2' },
    { nome: 'Dr. Enzo Levy', especialidade: 'Ortopedista', imagem: 'user7' },
    { nome: 'Dr. Felipe Siqueira', especialidade: 'Hematologista', imagem: 'user8' },
    { nome: 'Dra. George Soares', especialidade: 'Nefrologista', imagem: 'user5' },
    { nome: 'Dr. Ian Zambanini', especialidade: 'Pneumologista', imagem: 'user4' }
  ];
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>