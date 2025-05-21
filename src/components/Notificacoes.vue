<template>
    <div class="relative" ref="menu">
        <div @click="toggleMenu" :class="{
            'text-gray-800': notificacoes.length > 0,
            'text-gray-500': notificacoes.length === 0
        }" class="mt-1 cursor-pointer text-gray-500 hover:text-gray-900 relative">
            <i class="fa-solid fa-bell fa-2x"></i>
            <span v-if="notificacoes.length"
                class="absolute -top-1 -right-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {{ notificacoes.length }}
            </span>
        </div>

        <!-- Menu de notificações -->
        <div v-if="menuAberto"
            class="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded shadow-lg z-50">
            <div class="p-4 text-gray-700">
                <p class="font-semibold">Notificações</p>
                <ul class="mt-2 space-y-3 max-h-80 overflow-y-auto">
                    <li v-for="notif in notificacoes" :key="notif.id"
                        class="flex justify-between items-start gap-2 text-sm text-gray-600 border-b pb-2 last:border-none">
                        <span @click="redirecionar(notif.url_destino)"
                            class="cursor-pointer hover:text-blue-700 flex-1">
                            {{ notif.mensagem }}
                        </span>
                        <button @click="excluirNotificacao(notif.id)" class="cursor-pointer text-red-500 hover:text-red-700">
                            &times;
                        </button>
                    </li>
                    <li v-if="notificacoes.length === 0" class="text-sm text-gray-600">
                        Nenhuma notificação no momento.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'
import { Store } from 'vuex'

interface WithStore {
    $store: Store<any>
}

@Options({})
export default class Notificacoes extends Vue implements WithStore {
    $store!: Store<any>
    menuAberto = false
    notificacoes: Array<any> = []

    mounted() {
        document.addEventListener('click', this.handleClickOutside)
        this.carregarNotificacoes()

        // Atualiza automaticamente a cada 15 segundos
        setInterval(this.carregarNotificacoes, 15000)
    }

    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }

    toggleMenu() {
        this.menuAberto = !this.menuAberto
    }

    handleClickOutside(event: MouseEvent) {
        const menu = this.$refs.menu as HTMLElement
        if (menu && !menu.contains(event.target as Node)) {
            this.menuAberto = false
        }
    }

    async carregarNotificacoes() {
        try {
            const userRole = localStorage.getItem('userRole')
            if (userRole !== 'medico') {
                console.warn('Usuário não autorizado a ver notificações de médico')
                return
            }

            const emailMedico = localStorage.getItem('medicoEmail')
            if (!emailMedico) {
                console.warn('Email do médico não encontrado no localStorage')
                return
            }

            // Buscar ID do médico via API
            const responseId = await axios.get(`http://localhost/Projetos/tcc_unit/backend/api/buscar_medico_por_email.php?email=${emailMedico}`)
            const idMedico = responseId.data?.id

            if (!idMedico) {
                console.warn('ID do médico não encontrado na base de dados')
                return
            }

            // Buscar notificações do médico
            const response = await axios.get(`http://localhost/Projetos/tcc_unit/backend/api/notificacoes.php?id_medico=${idMedico}`)
            this.notificacoes = response.data
        } catch (error) {
            console.error("Erro ao carregar notificações", error)
        }
    }

    async excluirNotificacao(idNotificacao: number) {
        try {
            await axios.post('http://localhost/Projetos/tcc_unit/backend/api/excluir_notificacao.php',
                { id: idNotificacao },
                { headers: { 'Content-Type': 'application/json' } }
            )
            this.notificacoes = this.notificacoes.filter(notif => notif.id !== idNotificacao)
        } catch (error) {
            console.error('Erro ao excluir notificação', error)
        }
    }

    redirecionar(url: string) {
        this.$router.push(url)
    }
}
</script>
