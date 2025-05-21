<template>
  <navbar-medico />
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800">Olá, {{ nomeCompleto }}</h1>

      <!-- Seção de Consultas -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold text-gray-700">Consultas</h2>

        <div class="mt-4 space-y-4">
          <div class="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
            <span>Próximas consultas</span>
            <button class="btn-ver" @click="$router.push('/menu-medico/consultas-medico')">Ver</button>
          </div>
        </div>
      </div>

      <router-view v-if="$route.name === 'consultas-do-dia' || $route.name === 'consultas-medico'"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import NavbarMedico from '@/components/NavbarMedico.vue'
import { Store } from 'vuex'
import { Options, Vue } from 'vue-class-component'

interface WithStore {
  $store: Store<any>
}

@Options({
  components: {
    NavbarMedico
  },
  methods: {
    carregarMedico() {
      return this.$store.dispatch('medico/carregarMedico')
    }
  },
  async mounted() {
    await this.carregarMedico()
  }
})
export default class MenuMedico extends Vue implements WithStore {
  $store!: Store<any>

  get nomeCompleto(): string {
    return this.$store.getters['medico/nomeCompleto']
  }
}
</script>
