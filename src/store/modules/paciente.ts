import axios from 'axios'
import { ActionContext } from 'vuex'

interface PacienteState {
    nome: string
    sobrenome: string
    imagem: string | null
}

export default {
    namespaced: true,
    state: (): PacienteState => ({
        nome: '',
        sobrenome: '',
        imagem: null
    }),
    mutations: {
        setPaciente(state: PacienteState, payload: { nome: string, sobrenome: string, imagem: string | null }) {
            state.nome = payload.nome
            state.sobrenome = payload.sobrenome
            state.imagem = payload.imagem
        }
    },
    actions: {
        async carregarPaciente({ commit }: ActionContext<PacienteState, object>) {
            const email = localStorage.getItem('pacienteEmail')
            if (!email) return

            const response = await axios.get('http://localhost/Projetos/tcc_unit/backend/api/pacientes.php')
            if (response.data.success) {
                const paciente = response.data.pacientes.find((p: any) => p.email.toLowerCase() === email.toLowerCase())
                if (paciente) {
                    commit('setPaciente', paciente)
                    console.log('Paciente autenticado:', paciente)
                } else {
                    console.warn('Paciente não encontrado.')
                }
            }
        }
    },
    getters: {
        nomeCompleto(state: PacienteState): string {
            return `${state.nome} ${state.sobrenome}`
        },
        imagemPerfil(state: PacienteState): string {
            return state.imagem || ''
        }
    }
}
