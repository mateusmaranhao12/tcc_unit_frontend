<template>
    <div class="mt-6 p-4 bg-white shadow-md rounded-lg relative">

        <!-- Alerta aparece quando há uma mensagem -->
        <div v-if="mensagem_alerta" :class="estiloAlerta"
            class="flex items-center justify-center p-4 rounded-lg shadow-md mb-4 mt-8">
            <i :class="mensagem_alerta.icone" class="text-xl mr-2"></i>
            <span class="text-sm font-semibold">{{ mensagem_alerta.mensagem }}</span>
        </div>

        <!-- Botão para fechar a rota filha -->
        <button @click="$router.push('/menu-paciente')"
            class="absolute top-4 right-4 text-red-500 text-xl cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h2 class="text-2xl font-bold text-gray-800 mb-4">Minhas Consultas</h2>
        <!--Filtrar consultas-->
        <FiltrarConsultas @filtro-alterado="aplicarFiltro" />

        <!--Modal Reagendar Consultas-->
        <ModalReagendarConsulta v-if="modalReagendarVisivel && consultaSelecionada"
            :idMedico="consultaSelecionada.id_medico" @confirmar="confirmarReagendamento"
            @cancelar="modalReagendarVisivel = false" />

        <div v-if="consultas.length" class="space-y-4">
            <div v-for="consulta in consultasFiltradas" :key="consulta.id"
                class="bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                <div class="mb-2 md:mb-0 w-full md:w-auto">
                    <p class="text-lg font-semibold">{{ formatarData(consulta.data, consulta.horario) }}</p>
                    <p class="text-gray-600">Médico: {{ consulta.medico }}</p>
                    <p class="text-sm text-gray-600">E-mail: {{ consulta.email }}</p>
                    <p class="text-sm text-gray-600">Telefone: {{ consulta.telefone }}</p>
                    <p class="capitalize font-semibold" :class="{
                        'text-blue-600': consulta.status === 'agendada',
                        'text-red-600': consulta.status === 'cancelada',
                        'text-green-600': consulta.status === 'realizada',
                    }">{{ consulta.status }}</p>
                    <p class="capitalize font-semibold" :class="{
                        'text-cyan-600': consulta.modalidade === 'presencial',
                        'text-emerald-600': consulta.modalidade === 'online',
                    }">{{ consulta.modalidade }}</p>
                </div>
                <div class="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-auto">
                    <button v-if="consulta.status !== 'realizada'" @click="reagendarConsulta(consulta)"
                        class="btn-reagendar w-full md:w-auto">
                        <i class="fa-solid fa-calendar-days"></i> Reagendar
                    </button>

                    <button v-if="consulta.status == 'agendada'" @click="desmarcarConsulta(consulta.id)"
                        class="btn-desmarcar w-full md:w-auto">
                        <i class="fa-solid fa-xmark"></i> Desmarcar
                    </button>
                    <button v-if="consulta.status !== 'agendada'" @click="removerConsulta(consulta.id)"
                        class="btn-remover w-full md:w-auto">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>
            </div>
        </div>

        <p v-else class="text-gray-500 text-center">Nenhuma consulta encontrada.</p>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'
import FiltrarConsultas from './FiltrarConsultas.vue'
import ModalReagendarConsulta from './ModalReagendarConsulta.vue'
import { Store } from 'vuex'

type Consulta = {
    id: number
    data: string
    horario: string
    medico: string
    email: string
    telefone: string
    status: string
    id_medico: number
    modalidade: string
}

@Options({
    components: {
        FiltrarConsultas,
        ModalReagendarConsulta
    }
})


export default class ConsultasPaciente extends Vue {

    $store!: Store<any>
    consultas: Consulta[] = []
    consultaSelecionada: Consulta | null = null

    filtro: 'todos' | 'agendada' | 'realizada' | 'cancelada' | 'online' | 'presencial' = 'todos'

    // Alerta
    mensagem_alerta: { icone: string, mensagem: string, status: 'sucesso' | 'erro' } | null = null

    // Modal
    modalReagendarVisivel = false

    async mounted() {
        const emailPaciente = localStorage.getItem('pacienteEmail')
        if (!emailPaciente) return

        try {
            const response = await axios.get('http://localhost/Projetos/tcc_unit/backend/api/listar_consultas_paciente.php', {
                params: { email: emailPaciente }
            })

            if (response.data.success) {
                const hoje = new Date()
                const ano = hoje.getFullYear()
                const mes = String(hoje.getMonth() + 1).padStart(2, '0')
                const dia = String(hoje.getDate()).padStart(2, '0')
                const hojeStr = `${ano}-${mes}-${dia}`


                this.consultas = response.data.consultas.map((c: any) => {

                    const dataOriginal = c.data_consulta
                    const horarioFormatado = c.horario_consulta.replace(' - ', ' às ')

                    return {
                        ...c,
                        data: dataOriginal === hojeStr ? 'Hoje' : dataOriginal,
                        horario: horarioFormatado,
                        medico: `${c.nome_medico} ${c.sobrenome_medico}`,
                        email: c.email_medico,
                        telefone: c.telefone_medico,
                        status: c.status,
                        modalidade: c.modalidade
                    }
                })
            }
        } catch (error) {
            console.error('Erro ao buscar consultas:', error)
        }
    }

    //formatar data
    formatarData(data: string, horario: string): string {
        if (data === 'Hoje') {
            return `Hoje das ${horario}`
        }

        const [ano, mes, dia] = data.split('-')
        return `${dia}/${mes}/${ano} das ${horario}`
    }

    //enviar notificacao para medico
    async enviarNotificacaoParaMedico(idMedico: number, mensagem: string) {
        try {
            await axios.post('http://localhost/Projetos/tcc_unit/backend/api/inserir_notificacao.php', {
                destinatario: 'medico',
                id_destinatario: idMedico,
                mensagem: mensagem,
                url_destino: '/menu-medico/consultas-medico'
            }, {
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) {
            console.error('Erro ao enviar notificação para o médico:', error)
        }
    }

    //reagendar consulta
    reagendarConsulta(consulta: any) {
        this.consultaSelecionada = consulta
        this.modalReagendarVisivel = true
    }

    //confirmar reagendamento
    async confirmarReagendamento(payload: { data: string, horario: string }) {
        if (!this.consultaSelecionada?.id) return

        try {
            const response = await axios.post('http://localhost/Projetos/tcc_unit/backend/api/reagendar_consulta.php', {
                id: this.consultaSelecionada.id,
                data_consulta: payload.data,
                horario_consulta: payload.horario
            })

            if (response.data.success) {
                const consulta = this.consultas.find(c => c.id === this.consultaSelecionada?.id)
                if (consulta) {
                    consulta.data = payload.data
                    consulta.horario = payload.horario.replace(' - ', ' às ')
                    consulta.status = 'agendada'

                    const dataFormatada = this.formatarData(payload.data, payload.horario.replace(' - ', ' às '))

                    const nomePaciente = this.$store.state.paciente.nome
                    const sobrenomePaciente = this.$store.state.paciente.sobrenome
                    const nomeCompletoPaciente = `${nomePaciente} ${sobrenomePaciente}`

                    await this.enviarNotificacaoParaMedico(
                        consulta.id_medico,
                        `O paciente ${nomeCompletoPaciente} reagendou a consulta para ${dataFormatada}.`
                    )
                }

                this.mostrarMensagemAlerta('fa-solid fa-check', 'Consulta reagendada com sucesso!', 'sucesso')
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao reagendar: ' + response.data.message, 'erro')
            }
        } catch (error) {
            console.error('Erro ao reagendar consulta:', error)
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao reagendar consulta.', 'erro')
        } finally {
            this.modalReagendarVisivel = false
            this.consultaSelecionada = null
        }
    }

    //desmarcar consulta
    async desmarcarConsulta(id: number) {
        try {
            const response = await axios.post('http://localhost/Projetos/tcc_unit/backend/api/desmarcar_consulta.php', {
                id: id
            })

            if (response.data.success) {
                const consulta = this.consultas.find(c => c.id === id)
                if (consulta) {
                    consulta.status = 'cancelada'

                    const dataFormatada = this.formatarData(consulta.data, consulta.horario.replace(' - ', ' às '))

                    const nomePaciente = this.$store.state.paciente.nome
                    const sobrenomePaciente = this.$store.state.paciente.sobrenome
                    const nomeCompletoPaciente = `${nomePaciente} ${sobrenomePaciente}`

                    await this.enviarNotificacaoParaMedico(
                        consulta.id_medico,
                        `O paciente ${nomeCompletoPaciente} desmarcou a consulta agendada para ${dataFormatada}.`
                    )
                }
                this.mostrarMensagemAlerta('fa-solid fa-check', 'Consulta desmarcada com sucesso!', 'sucesso')
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao desmarcar consulta: ' + response.data.message, 'erro')
            }
        } catch (error) {
            console.error('Erro ao desmarcar consulta:', error)
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao desmarcar consulta.', 'erro')
        }
    }

    //remover consulta
    async removerConsulta(id: number) {
        try {
            const response = await axios.post('http://localhost/Projetos/tcc_unit/backend/api/remover_consulta.php', {
                id: id
            })

            if (response.data.success) {
                this.consultas = this.consultas.filter(c => c.id !== id)
                this.mostrarMensagemAlerta('fa-solid fa-trash', 'Consulta removida com sucesso!', 'sucesso')
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao remover consulta: ' + response.data.message, 'erro')
            }
        } catch (error) {
            console.error('Erro ao remover consulta:', error)
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao remover consulta.', 'erro')
        }
    }

    //consultas filtradas
    get consultasFiltradas() {
        if (this.filtro === 'todos') return this.consultas

        // Verifica se o filtro é um status conhecido
        const statusFiltros = ['agendada', 'realizada', 'cancelada']
        if (statusFiltros.includes(this.filtro)) {
            return this.consultas.filter(c => c.status === this.filtro)
        }

        // Caso contrário, assume que o filtro é modalidade
        return this.consultas.filter(c => c.modalidade === this.filtro)
    }

    //aplicar filtro
    aplicarFiltro(status: string) {
        this.filtro = status as 'todos' | 'agendada' | 'realizada' | 'cancelada' | 'online' | 'presencial'
    }

    //mostrar mensagem alerta
    private mostrarMensagemAlerta(icone: string, mensagem: string, status: 'sucesso' | 'erro') {
        this.mensagem_alerta = { icone, mensagem, status }
        setTimeout(() => {
            this.mensagem_alerta = null
        }, 5000)
    }

    // Computed para retornar o estilo do alerta com base no tipo
    get estiloAlerta(): string {
        return this.mensagem_alerta?.status === 'sucesso'
            ? 'bg-green-100 text-green-800 border border-green-500'
            : 'bg-red-100 text-red-800 border border-red-500'
    }
}
</script>
