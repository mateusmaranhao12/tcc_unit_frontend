<template>
    <nav class="bg-white text-green-500 p-4 shadow-md">
        <div class="container mx-auto flex flex-wrap justify-between items-center gap-4">

            <!-- Nome, imagem e notificações juntos no mobile -->
            <div class="flex items-center space-x-3 order-1 md:order-none">
                <img :src="imagemPerfil" alt="Perfil"
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
import { logout } from '@/router'
import { Store } from 'vuex'
import Notificacoes from './Notificacoes.vue'

interface WithStore {
    $store: Store<any>
}

@Options({

    components: {
        Notificacoes
    }
})
export default class NavbarMedico extends Vue implements WithStore {
    $store!: Store<any> // adiciona tipagem da store

    alterarInformacoes() {
        this.$router.push('/alterar-dados-perfil-medico')
    }

    logout() {
        console.log("Logout realizado")
        logout()
    }

    get nomeCompleto(): string {
        return this.$store.getters['medico/nomeCompleto']
    }

    get imagemPerfil(): string {
        return this.$store.getters['medico/imagemPerfil']
    }
}
</script>

<style lang="scss">
@import '../scss/menu_autenticado.scss';
</style>
