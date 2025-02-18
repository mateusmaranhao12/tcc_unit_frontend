<template>
    <NavbarIndex />
    <div class="card-form container mx-auto mt-8">
        <h1 class="text-3xl font-bold text-center">Login</h1>

        <!-- Botões para selecionar tipo de usuário -->
        <div class="flex justify-center space-x-4 mt-6">
            <button @click="tipoUsuario = 'paciente'" :class="{ 'active': tipoUsuario === 'paciente' }"
                class="btn-toggle">Login Paciente</button>
            <button @click="tipoUsuario = 'medico'" :class="{ 'active': tipoUsuario === 'medico' }"
                class="btn-toggle">Login Médico</button>
        </div>

        <!-- Formulário de Login -->
        <LoginPaciente v-if="tipoUsuario === 'paciente'" />
        <LoginMedico v-if="tipoUsuario === 'medico'" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavbarIndex from '@/components/NavbarIndex.vue';
import LoginPaciente from '@/components/LoginPaciente.vue';
import LoginMedico from '@/components/LoginMedico.vue';

@Options({
    components: {
        NavbarIndex,
        LoginPaciente,
        LoginMedico
    }
})
export default class Login extends Vue {
    tipoUsuario = 'paciente'
}
</script>

<style lang="scss">
@import '../scss/forms.scss';
</style>