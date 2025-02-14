<template>
  <nav class="nav-index bg-white shadow-md py-4">
    <div class="container mx-auto flex justify-center">
      <ul class="flex space-x-10">
        <li>
          <router-link to="/" class="text-gray-700 text-lg font-semibold"
            :class="{ 'active': $route.path === '/' }">Home</router-link>
        </li>
        <li>
          <router-link to="/sobre" class="text-gray-700 text-lg font-semibold"
            :class="{ 'active': $route.path === '/sobre' }">Sobre</router-link>
        </li>
        <li>
          <router-link to="/medicos" class="text-gray-700 text-lg font-semibold"
            :class="{ 'active': $route.path === '/medicos' }">Médicos</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class NavbarIndex extends Vue { }
</script>

<style lang="scss">
@import '../scss/navbar.scss';
</style>