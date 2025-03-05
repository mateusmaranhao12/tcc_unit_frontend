<template>
    <nav class="bg-white text-green-500 p-4 shadow-md">
        <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div class="flex items-center space-x-3">
                <img src="../assets/imgs/user1.png" alt="Perfil" class="w-10 h-10 rounded-full border border-gray-300" />
                <h1 class="text-xl font-bold">Mateus</h1>
            </div>

            <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                <button @click="alterarInformacoes" class="btn-green-menu">Alterar
                    dados do perfil</button>
                <button @click="alterarHorarios" class="btn-green-menu">Alterar Horários</button>
                <button @click="logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class NavbarMedico extends Vue {
    alterarInformacoes() {
        this.$router.push('/alterar-informacoes-medico')
    }

    alterarHorarios() {
        this.$router.push('/alterar-horarios-medico')
    }

    logout() {
        console.log("Logout realizado")
        this.$router.push('/login')
    }
}
</script>

<style lang="scss">
@import '../scss/menu_autenticado.scss';
</style>
