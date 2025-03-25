<template>
  <NavbarIndex />
  <div class="medicos">
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold text-center">Médicos</h1>

      <!-- Lista de Médicos -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div v-for="(medico, index) in medicos" :key="index"
          class="card-medico bg-white p-6 rounded-lg shadow text-center">

          <!-- Usa a imagem do backend ou uma imagem padrão -->
          <img :src="medico.imagem || require('@/assets/imgs/user-default.jpg')" alt="Foto do Médico"
            class="w-32 h-32 mx-auto rounded-full mb-4 object-cover border-2 border-gray-300">

          <h2 class="text-xl font-semibold text-gray-800">{{ medico.nome }} {{ medico.sobrenome }}</h2>
          <p class="text-gray-600">{{ formatarEspecialidade(medico.especialidade) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavbarIndex from '@/components/NavbarIndex.vue';
import axios from 'axios';

@Options({
  components: {
    NavbarIndex
  },
})
export default class Medicos extends Vue {
  medicos: Array<{ nome: string, sobrenome: string, especialidade: string, imagem: string | null }> = []

  async mounted() {
    try {
      const response = await axios.get('http://localhost/Projetos/tcc_unit/backend/api/medicos.php');

      if (response.data.success) {
        this.medicos = response.data.medicos
      } else {
        console.error('Erro ao buscar médicos:', response.data.message)
      }

    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  // Função para converter especialidades terminadas em "ia" para "ista" ou "tra" (no caso das exceções)
  formatarEspecialidade(especialidade: string): string {
    const especialidades = [
      'Alergologia', 'Ortopedia', 'Cardiologia', 'Dermatologia', 'Gastroenterologia',
      'Geriatria', 'Hematologia', 'Infectologia', 'Nefrologia', 'Neurologia',
      'Oncologia', 'Pediatria', 'Pneumologia', 'Psiquiatria', 'Reumatologia'
    ]

    // Mapeamento de exceções específicas
    const excecoes: Record<string, string> = {
      'Geriatria': 'Geriatra',
      'Pediatria': 'Pediatra',
      'Psiquiatria' : 'Psiquiatra'
    };

    // Se for uma exceção, retorna a conversão específica
    if (excecoes[especialidade]) {
      return excecoes[especialidade]
    }

    // Converte "ia" para "ista" para as demais especialidades
    if (especialidades.includes(especialidade)) {
      return especialidade.replace(/ia$/, 'ista')
    }

    // Retorna o nome original caso não haja necessidade de conversão
    return especialidade
  }

}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.card-medico img {
  object-fit: cover;
  width: 128px;
  height: 128px;
}
</style>
