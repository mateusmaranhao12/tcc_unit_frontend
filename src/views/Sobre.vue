<template>
  <NavbarIndex />
  <div class="sobre-container">
    <!-- Seção de Introdução -->
    <section class="bg-green-50 py-16 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-800">Sobre o Saúde+</h1>
        <p class="text-lg text-gray-600 mt-4">
          Um sistema inovador para facilitar o agendamento de consultas e o gerenciamento da sua saúde.
        </p>
      </div>
    </section>

    <!-- Objetivos do Sistema -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold text-gray-800 text-center">Objetivos do Sistema</h2>
        <p class="text-gray-600 text-lg mt-4 text-center">
          O Saúde+ foi criado para conectar pacientes e médicos de forma rápida e eficiente,
          simplificando o processo de agendamento e melhorando a experiência dos usuários.
        </p>
      </div>
    </section>

    <!-- Benefícios -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold text-gray-800 text-center">Benefícios</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div v-for="(benefit, index) in benefits" :key="index"
            class="benefit-item-sobre text-center p-6 bg-white rounded-lg shadow">
            <h3 class="text-xl font-semibold text-green-600">
              <i class="fa-solid fa-check"></i> {{ benefit.title }}
            </h3>
            <p class="text-gray-600 mt-2">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NavbarIndex from '@/components/NavbarIndex.vue'

@Options({
  components: {
    NavbarIndex
  }
})
export default class Sobre extends Vue {
  benefits = [
    { title: 'Facilidade no Agendamento', description: 'Agende consultas com poucos cliques.' },
    { title: 'Profissionais Qualificados', description: 'Médicos especialistas disponíveis.' },
    { title: 'Gerenciamento Inteligente', description: 'Acompanhe histórico e lembretes de consultas.' }
  ];
}
</script>

<style lang="scss">
@import '../scss/paginas_iniciais.scss';

.benefit-item-sobre {
    transition: transform 0.3s ease;
}

.benefit-item-sobre:hover {
    transform: translateY(-5px);
}
</style>
