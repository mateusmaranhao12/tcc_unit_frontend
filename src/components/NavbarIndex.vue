<template>
  <nav class="nav-index bg-white shadow-md">
    <div class="container mx-auto flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex items-center">
        <span class="text-2xl font-bold text-blue-600">Saude+</span>
      </div>

      <!-- Menu Hamburguer para telas menores -->
      <button class="md:hidden text-gray-800 focus:outline-none" @click="toggleMenu">
        <i class="fa-solid fa-bars text-2xl"></i>
      </button>

      <!-- Navigation Links -->
      <ul :class="{ 'hidden': !menuOpen, 'block': menuOpen }"
        class="md:flex md:space-x-10 absolute md:relative bg-white md:bg-transparent w-full md:w-auto top-16 left-0 md:top-auto md:left-auto shadow-md md:shadow-none md:flex-row flex-col text-center py-4 md:py-0">
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
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class NavbarIndex extends Vue {

  menuOpen = false

  toggleMenu() {
    this.menuOpen = !this.menuOpen
  }

}
</script>

<style lang="scss">
@import '../scss/navbar.scss';
</style>