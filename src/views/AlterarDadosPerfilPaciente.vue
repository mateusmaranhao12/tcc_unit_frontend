<template>
    <NavbarPaciente />
    <h1>Dados paciente</h1>
</template>

<script lang="ts">
import NavbarPaciente from '@/components/NavbarPaciente.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {
        NavbarPaciente
    }
})

export default class AlterarDadosPerfilPaciente extends Vue {
}

</script>

<style lang="scss">
@import '../scss/menu_autenticado.scss';
</style>
