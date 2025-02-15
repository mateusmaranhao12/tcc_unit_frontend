<template>
  <NavbarIndex />
  <div class="index-container">
    <!-- Hero Section -->
    <section class="hero bg-green-50 py-16 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-800">
          Agende suas Consultas com Facilidade!
        </h1>
        <p class="text-lg text-gray-600 mt-4">
          Encontre especialistas e gerencie suas consultas médicas de forma rápida e segura.
        </p>

        <!-- Botões de Ação -->
        <div class="mt-6 space-x-4">
          <router-link to="/cadastro" class="btn-primary">
            Agendar Consulta
          </router-link>
          <router-link to="/cadastro" class="btn-secondary">
            Cadastre-se
          </router-link>
        </div>
      </div>
    </section>

    <!-- Imagem Ilustrativa -->
    <section class="image-section text-center my-10">
      <img src="../assets/imgs/consultas-medicas.jpg" alt="Consulta Médica"
        class="mx-auto rounded-lg shadow-lg w-3/4 md:w-1/2">
    </section>

    <!-- Benefícios -->
    <section class="benefits text-center py-10">
      <div class="container mx-auto">
        <h2 class="text-3xl font-semibold text-gray-800">Por que usar nosso sistema?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div v-for="(benefit, index) in benefits" :key="index" class="benefit-item">
            <h3 class="text-xl font-semibold text-green-600">
              <i class="fa-solid fa-check"></i> {{ benefit.title }}
            </h3>
            <p class="text-gray-600">{{ benefit.description }}</p>
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
  },
})
export default class Index extends Vue {

  benefits = [
    { title: 'Fácil de Usar', description: 'Interface intuitiva para agendar e gerenciar consultas.' },
    { title: 'Profissionais Qualificados', description: 'Médicos especializados disponíveis a qualquer momento.' },
    { title: 'Segurança e Privacidade', description: 'Seus dados protegidos conforme as regulamentações.' }
  ]

}
</script>

<style lang="scss">
@import '../scss/paginas_iniciais.scss';
</style>