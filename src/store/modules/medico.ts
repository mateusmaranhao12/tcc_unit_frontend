import axios from 'axios'
import { ActionContext } from 'vuex'

interface MedicoState {
    nome: string
    sobrenome: string
    imagem: string
}

export default {
    namespaced: true,
    state: (): MedicoState => ({
        nome: '',
        sobrenome: '',
        imagem: ''
    }),
    mutations: {
        setMedico(state: MedicoState, payload: { nome: string; sobrenome: string; imagem: string }) {
            state.nome = payload.nome
            state.sobrenome = payload.sobrenome
            state.imagem = payload.imagem
        }
    },
    actions: {
        async carregarMedico({ commit }: ActionContext<MedicoState, object>) {
            console.log('[Vuex] Action carregarMedico iniciada') // 👈

            const email = localStorage.getItem('medicoEmail')
            console.log('Email no localStorage:', email) // 👈

            if (!email) return

            const response = await axios.get('http://localhost/Projetos/tcc_unit/backend/api/medicos.php')
            console.log('Resposta da API:', response.data) // 👈

            if (response.data.success) {
                const medico = response.data.medicos.find((m: any) => m.email.toLowerCase() === email.toLowerCase())
                if (medico) {
                    commit('setMedico', medico)
                    console.log('Médico autenticado encontrado:', medico) // 👈
                } else {
                    console.warn('Médico não encontrado com o e-mail:', email)
                }
            } else {
                console.error('Erro ao carregar médicos:', response.data.message)
            }
        }
    },

    getters: {
        nomeCompleto(state: MedicoState): string {
            return `${state.nome} ${state.sobrenome}`
        },

        imagemPerfil(state: MedicoState): string {
            return state.imagem
        }
    }
}