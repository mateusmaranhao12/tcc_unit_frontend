<template>
    <navbar-paciente />
    <div class="container mx-auto p-6">
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
            <select v-model="medicoSelecionado" class="input-field">
                <template v-if="medicosDisponiveis.length">
                    <option value="" disabled>Selecione um médico</option>
                    <option v-for="med in medicosDisponiveis" :key="med.nome" :value="med">{{ med.nome }} {{
                        med.sobrenome
                        }}</option>
                </template>

                <!-- Caso não haja médicos -->
                <option v-else disabled>Nenhum médico cadastrado com essa especialidade</option>
            </select>
        </div>

        <!-- Seleção do Horário -->
        <div v-if="medicoSelecionado" class="mb-4">
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

    // Variáveis de estado
    especialidadeSelecionada = ''
    medicoSelecionado: any = null
    horarioSelecionado = ''

    //data selecionada
    dataSelecionada: string | null = null

    medicosDisponiveis: any[] = []

    // Lista de médicos simulada
    medicos: any[] = []

    //especialidades
    especialidades = [
        'Alergologia',
        'Ortopedia',
        'Cardiologia',
        'Dermatologia',
        'Gastroenterologia',
        'Geriatria',
        'Hematologia',
        'Infectologia',
        'Nefrologia',
        'Neurologia',
        'Oncologia',
        'Pediatria',
        'Pneumologia',
        'Psiquiatria',
        'Reumatologia',
    ]

    //horario atendimento
    horariosAtendimento = [
        '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00',
        '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
        '16:00 - 17:00', '17:00 - 18:00'
    ]

    //carregar medicos do banco de dados
    async carregarMedicos() {
        try {
            const response = await axios.get('http://localhost/Projetos/tcc_unit/backend/api/listar_medicos.php')
            if (response.data.success) {
                // Converte horários de string para array, se necessário
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
        this.medicoSelecionado = null
        this.horarioSelecionado = ''
        this.medicosDisponiveis = this.medicos.filter(med => med.especialidade === this.especialidadeSelecionada)
    }

    // Simula a confirmação do agendamento
    agendarConsulta() {
        console.log('consulta agendada')
    }

    //voltar ao menu inicial
    public voltarMenuInicial() {
        this.$router.push('/menu-paciente')
    }

    //data minima
    get minDate() {
        const today = new Date()
        return today.toISOString().split('T')[0]
    }
}
</script>

<style lang="scss">
@import '../scss/agendar_consulta.scss';
</style>