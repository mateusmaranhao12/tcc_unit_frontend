<template>
    <nav class="bg-white text-green-500 p-4 shadow-md">
        <div class="container mx-auto flex flex-wrap justify-between items-center gap-4">

            <!-- Nome, imagem e notificações juntos no mobile -->
            <div class="flex items-center space-x-3 order-1 md:order-none">
                <img :src="imagemPerfil || require('@/assets/imgs/user-default.jpg')" alt="Perfil"
                    class="w-10 h-10 rounded-full border border-gray-300" />
                <h1 class="text-xl font-bold">{{ nomeCompleto }}</h1>

                <!-- Ícone de notificação ao lado no mobile -->
                <div class="md:hidden">
                    <Notificacoes />
                </div>
            </div>

            <!-- Ações: notificação (desktop), editar, logout -->
            <div class="flex items-center space-x-4 order-2 md:order-none">
                <!-- Ícone de notificação à direita no desktop -->
                <div class="hidden md:block">
                    <Notificacoes />
                </div>

                <button @click="alterarInformacoes" class="btn-green-menu">
                    Alterar dados do perfil
                </button>

                <button @click="logout" class="btn-logout">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </div>
    </nav>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { mapGetters } from 'vuex'
import { logout } from '@/router'
import Notificacoes from './Notificacoes.vue'

@Options({
    computed: {
        ...mapGetters('paciente', ['nomeCompleto', 'imagemPerfil'])
    },

    components: {
        Notificacoes
    }
})
export default class NavbarPaciente extends Vue {
    // Adicionamos as propriedades manualmente para o TypeScript reconhecer
    get nomeCompleto(): string {
        return (this as any).$store.getters['paciente/nomeCompleto']
    }

    get imagemPerfil(): string {
        return (this as any).$store.getters['paciente/imagemPerfil']
    }

    alterarInformacoes() {
        this.$router.push('/alterar-dados-perfil-paciente')
    }

    logout() {
        console.log('Logout realizado')
        logout()
    }
}
</script>


<style lang="scss">
@import '../scss/menu_autenticado.scss';
</style>