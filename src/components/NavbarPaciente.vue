<template>
    <nav class="bg-white text-green-500 p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <img src="../assets/imgs/user-default.jpg" alt="Perfil" class="w-10 h-10 rounded-full border border-gray-300" />
                <h1 class="text-xl font-bold">Rodolfo</h1>
            </div>

            <div class="flex space-x-4">
                <button @click="alterarInformacoes" class="btn-green-menu">Alterar
                    dados do perfil</button>
                <button @click="atualizarConvenio" class="btn-green-menu">Atualizar convênio</button>
                <button @click="logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class NavbarPaciente extends Vue {
    alterarInformacoes() {
        this.$router.push('/alterar-informacoes-medico')
    }

    atualizarConvenio() {
        this.$router.push('/atualizar-convenio')
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
