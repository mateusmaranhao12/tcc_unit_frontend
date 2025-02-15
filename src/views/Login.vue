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

        <!-- Formulário de Login Paciente -->
        <form v-if="tipoUsuario === 'paciente'" class="form-login grid grid-cols-1 gap-6 mt-6">
            <input type="email" v-model="loginPaciente.email" placeholder="E-mail" class="input-field" >
            <input type="password" v-model="loginPaciente.senha" placeholder="Senha" class="input-field" >
            <div class="flex justify-end">
                <button type="submit" class="btn-submit">Fazer login</button>
            </div>
        </form>

        <!-- Formulário de Login Médico -->
        <form v-if="tipoUsuario === 'medico'" class="form-login grid grid-cols-1 gap-6 mt-6">
            <input type="email" v-model="loginMedico.email" placeholder="E-mail" class="input-field" >
            <input type="password" v-model="loginMedico.senha" placeholder="Senha" class="input-field" >
            <div class="flex justify-end">
                <button type="submit" class="btn-submit">Fazer login</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavbarIndex from '@/components/NavbarIndex.vue';

@Options({
    components: {
        NavbarIndex
    }
})
export default class Login extends Vue {
    tipoUsuario = 'paciente'

    loginPaciente = {
        email: '',
        senha: ''
    }

    loginMedico = {
        email: '',
        senha: ''
    }
}
</script>

<style lang="scss">
@import '../scss/forms.scss';
</style>