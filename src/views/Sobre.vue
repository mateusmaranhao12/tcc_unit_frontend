<template>
    <NavbarIndex />
    <h1 class="text-3xl font-bold">
      Sobre
    </h1>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import NavbarIndex from '@/components/NavbarIndex.vue'
  
  @Options({
    components: {
      NavbarIndex
    },
  })
  export default class Sobre extends Vue { }
  </script>
  