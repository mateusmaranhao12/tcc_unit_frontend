<template>
    <NavbarIndex />
    <div class="card-form container mx-auto mt-8 mb-8">
        <h1 class="text-3xl font-bold text-center">Cadastro</h1>

        <!-- Botões para selecionar tipo de usuário -->
        <div class="flex justify-center space-x-4 mt-6">
            <button @click="tipoUsuario = 'paciente'" :class="{ 'active': tipoUsuario === 'paciente' }"
                class="btn-toggle">Paciente</button>
            <button @click="tipoUsuario = 'medico'" :class="{ 'active': tipoUsuario === 'medico' }"
                class="btn-toggle">Médico</button>
        </div>

        <!-- Formulário Paciente -->
        <CadastroPaciente v-if="tipoUsuario === 'paciente'" @submit="cadastrarPaciente" />

        <!-- Formulário Médico -->
        <CadastroMedico v-if="tipoUsuario === 'medico'" @submit="cadastrarMedico" />

    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavbarIndex from '@/components/NavbarIndex.vue';
import CadastroMedico from '@/components/CadastroMedico.vue'
import CadastroPaciente from '@/components/CadastroPaciente.vue'

@Options({
    components: {
        NavbarIndex,
        CadastroMedico,
        CadastroPaciente
    }
})
export default class Cadastro extends Vue {
    tipoUsuario = 'paciente'

    cadastrarMedico(dadosMedico: any) {
        console.log('Médico cadastrado:', dadosMedico)
    }

    cadastrarPaciente(dadosPaciente: any) {
        console.log('Paciente cadastrado:', dadosPaciente)
    }
}
</script>

<style lang="scss">
@import '../scss/forms.scss';
</style>
