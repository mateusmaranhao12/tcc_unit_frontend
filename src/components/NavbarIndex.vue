<template>
  <nav class="nav-index bg-white shadow-md">
    <div class="container mx-auto flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex items-center flex-1">
        <span class="text-2xl font-bold text-green-600">App Saude+</span>
      </div>

      <!-- Navigation Links Centralizados (Apenas em telas grandes) -->
      <div class="hidden md:flex flex-1 justify-center">
        <ul class="flex space-x-10">
          <li>
            <router-link to="/" class="text-gray-700 text-lg font-semibold" :class="{ 'active': $route.path === '/' }">
              <i class="fa-solid fa-house"></i> Home
            </router-link>
          </li>
          <li>
            <router-link to="/sobre" class="text-gray-700 text-lg font-semibold"
              :class="{ 'active': $route.path === '/sobre' }">
              <i class="fa-solid fa-circle-info"></i> Sobre
            </router-link>
          </li>
          <li>
            <router-link to="/medicos" class="text-gray-700 text-lg font-semibold"
              :class="{ 'active': $route.path === '/medicos' }">
              <i class="fa-solid fa-user-doctor"></i> Médicos
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Botões de Login e Cadastro (Apenas em telas grandes) -->
      <div class="hidden md:flex items-center flex-1 justify-end space-x-4">
        <router-link to="/login" class="text-gray-800 hover:text-gray-900 text-lg font-semibold">Login</router-link>
        <router-link to="/cadastro"
          class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Cadastre-se</router-link>
      </div>
    </div>

    <!-- Mobile Menu -->
    <NavbarMobile />
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NavbarMobile from './NavbarMobile.vue'

@Options({
  components: {
    NavbarMobile
  }
})
export default class NavbarIndex extends Vue {
}
</script>

<style lang="scss">
@import '../scss/navbar.scss';
</style>
