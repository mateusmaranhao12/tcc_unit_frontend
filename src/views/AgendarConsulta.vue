<template>
    <navbar-paciente />
    <div class="container mx-auto p-6">

        <!-- Alerta -->
        <div v-if="mensagem_alerta" :class="estiloAlerta"
            class="flex items-center justify-center p-4 rounded-lg shadow-md mb-4 mt-4">
            <i :class="mensagem_alerta.icone" class="text-xl mr-2"></i>
            <span class="text-sm font-semibold">{{ mensagem_alerta.mensagem }}</span>
        </div>

        <button class="back-menu" @click="voltarMenuInicial"><i class="fa-solid fa-chevron-left"></i> Voltar</button>
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Agendar Consulta</h1>

        <!-- Seleção da Especialidade -->
        <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Escolha a especialidade:</label>
            <select v-model="especialidadeSelecionada" class="input-field" @change="filtrarMedicos">
                <option value="" disabled>Selecione uma especialidade</option>
                <option v-for="esp in especialidades" :key="esp" :value="esp">{{ esp }}</option>
            </select>
        </div>

        <!-- Seleção do Médico -->
        <div v-if="especialidadeSelecionada" class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Escolha o médico:</label>
            <select v-model="medicoSelecionadoEmail" class="input-field">
                <template v-if="medicosDisponiveis.length">
                    <option value="" disabled>Selecione um médico</option>
                    <option v-for="med in medicosDisponiveis" :key="med.email" :value="med.email">
                        {{ med.nome }} {{ med.sobrenome }}
                    </option>
                </template>
                <option v-else disabled>Nenhum médico cadastrado com essa especialidade</option>
            </select>

        </div>

        <!-- Seleção do Horário -->
        <div v-if="mostrarHorarios" class="mb-4">
            <!-- Escolha da data -->
            <label class="block text-gray-700 font-semibold mb-2">Escolha uma data:</label>
            <input type="date" v-model="dataSelecionada" class="input-field" :min="minDate" />

            <!-- Escolha do horário -->
            <label class="block text-gray-700 font-semibold mb-2 mt-4">Escolha o horário:</label>
            <select v-model="horarioSelecionado" class="input-field">
                <option value="" disabled>Selecione um horário</option>
                <option v-for="horario in medicoSelecionado.horarios" :key="horario" :value="horario">
                    {{ horario }}
                </option>
            </select>
        </div>

        <!-- Escolha da modalidade -->
        <div v-if="horarioSelecionado" class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2 mt-4">Modalidade da consulta:</label>
            <select v-model="modalidadeSelecionada" class="input-field">
                <option value="" disabled>Selecione a modalidade</option>
                <option value="presencial">Presencial</option>
                <option value="online">Online (Telemedicina)</option>
            </select>
        </div>

        <!-- Botão de Agendar -->
        <button v-if="horarioSelecionado" class="btn-agendar" @click="agendarConsulta">
            Confirmar Agendamento
        </button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NavbarPaciente from '@/components/NavbarPaciente.vue'
import axios from 'axios'
import { Store } from 'vuex'

interface WithStore {
    $store: Store<any>
}

@Options({
    components: {
        NavbarPaciente
    },

    methods: {
        carregarPaciente() {
            return this.$store.dispatch('paciente/carregarPaciente')
        }
    },

    async mounted() {
        await this.carregarPaciente()
        this.carregarMedicos()
    }
})
export default class AgendarConsulta extends Vue {

    $store!: Store<any>

    //variacoes de estados
    especialidadeSelecionada = ''

    medicoSelecionadoEmail = ''

    horarioSelecionado = ''
    dataSelecionada: string | null = null

    medicosDisponiveis: any[] = []
    medicos: any[] = []

    modalidadeSelecionada = ''

    //especialidades
    especialidades = [
        'Alergologia', 'Ortopedia', 'Cardiologia', 'Dermatologia', 'Gastroenterologia',
        'Geriatria', 'Hematologia', 'Infectologia', 'Nefrologia', 'Neurologia',
        'Oncologia', 'Pediatria', 'Pneumologia', 'Psiquiatria', 'Reumatologia'
    ]

    //horarios
    horariosAtendimento = [
        '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00',
        '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
        '16:00 - 17:00', '17:00 - 18:00'
    ]

    // Alerta
    mensagem_alerta: { icone: string, mensagem: string, status: 'sucesso' | 'erro' } | null = null

    get mostrarHorarios() {
        return !!this.medicoSelecionado && this.medicoSelecionado.horarios?.length
    }

    get medicoSelecionado() {
        return this.medicosDisponiveis.find(m => m.email === this.medicoSelecionadoEmail)
    }

    //carregar medicos do banco de dados
    async carregarMedicos() {
        try {
            const response = await axios.get('http://localhost/Projetos/tcc_unit/backend/api/listar_medicos.php')
            if (response.data.success) {
                this.medicos = response.data.medicos.map((med: any) => {
                    if (typeof med.horarios === 'string') {
                        try {
                            med.horarios = JSON.parse(med.horarios)
                        } catch {
                            med.horarios = []
                        }
                    }
                    return med
                })

            } else {
                console.warn(response.data.message)
            }
        } catch (err) {
            console.error('Erro ao carregar médicos:', err)
        }
    }

    // Filtra os médicos disponíveis conforme a especialidade escolhida
    filtrarMedicos() {
        this.horarioSelecionado = ''
        this.medicosDisponiveis = this.medicos.filter(med => med.especialidade === this.especialidadeSelecionada)
    }

    // confirmação do agendamento
    async agendarConsulta() {
        const emailPaciente = localStorage.getItem('pacienteEmail')

        // Verifica se os campos estão preenchidos
        if (!emailPaciente || !this.dataSelecionada || !this.horarioSelecionado || !this.medicoSelecionado || !this.modalidadeSelecionada) {
            this.mostrarMensagemAlerta(
                'fa-solid fa-circle-xmark',
                'Por favor, preencha todos os campos para agendar a consulta.',
                'erro'
            )
            return
        }

        // Constrói objeto Date com base na data e horário selecionados
        const [horaInicio] = this.horarioSelecionado.split(' - ')
        const dataHoraSelecionada = new Date(`${this.dataSelecionada}T${horaInicio}:00`)
        const agora = new Date()

        // Valida se a data/hora está no futuro
        if (isNaN(dataHoraSelecionada.getTime()) || dataHoraSelecionada <= agora) {
            this.mostrarMensagemAlerta(
                'fa-solid fa-circle-xmark',
                'Selecione uma data e horário válidos a partir do momento atual.',
                'erro'
            )
            return
        }

        try {
            const response = await axios.post('http://localhost/Projetos/tcc_unit/backend/api/agendar_consulta.php', {
                email_paciente: emailPaciente,
                email_medico: this.medicoSelecionado.email,
                data_consulta: this.dataSelecionada,
                horario_consulta: this.horarioSelecionado,
                modalidade_consulta: this.modalidadeSelecionada
            })

            if (response.data.success) {
                this.mostrarMensagemAlerta('fa-solid fa-check', 'Consulta agendada com sucesso!', 'sucesso')
                await this.enviarNotificacaoParaMedico()
                this.limparFormulario()
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro: ' + response.data.message, 'erro')
            }
        } catch (error) {
            console.error('Erro ao agendar consulta:', error)
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao agendar consulta.', 'erro')
        }
    }

    //enviar notificacao para medico
    async enviarNotificacaoParaMedico() {
        try {
            const nomePaciente = this.$store.state.paciente.nome
            const sobrenomePaciente = this.$store.state.paciente.sobrenome
            const nomeCompletoPaciente = `${nomePaciente} ${sobrenomePaciente}`

            // Formatar data
            const [ano, mes, dia] = this.dataSelecionada!.split('-')
            const dataFormatada = `${dia}/${mes}/${ano} das ${this.horarioSelecionado.replace(' - ', ' às ')}`

            const mensagem = `${nomeCompletoPaciente} marcou uma consulta com você para ${dataFormatada}.`
            const urlDestino = '/menu-medico/consultas-medico'

            // Buscar ID do medico via axios
            const response = await axios.get(`http://localhost/Projetos/tcc_unit/backend/api/buscar_medico_por_email.php?email=${this.medicoSelecionado.email}`)
            const idMedico = response.data?.id

            if (!idMedico) {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao buscar médico', 'erro')
                return
            }

            await axios.post('http://localhost/Projetos/tcc_unit/backend/api/inserir_notificacao.php', {
                destinatario: 'medico',
                id_destinatario: idMedico,
                mensagem,
                url_destino: urlDestino
            }, {
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) {
            console.error('Erro ao enviar notificação para o médico:', error)
        }
    }

    //limpar formulario
    private limparFormulario() {
        this.especialidadeSelecionada = ''
        this.medicoSelecionadoEmail = ''
        this.dataSelecionada = ''
        this.horarioSelecionado = ''
        this.modalidadeSelecionada = ''
    }

    //voltar ao menu inicial
    public voltarMenuInicial() {
        this.$router.push('/menu-paciente')
    }

    //data minima
    get minDate() {
        const today = new Date()
        const localDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()) // zera hora
        return localDate.toISOString().split('T')[0]
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
            : 'bg-red-100 text-red-800 border border-red-500';
    }
}
</script>

<style lang="scss">
@import '../scss/agendar_consulta.scss';
</style>