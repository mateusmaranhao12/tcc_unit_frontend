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
            <select v-model="medicoSelecionado" class="input-field" @change="mostrarHorarios">
                <option value="" disabled>Selecione um médico</option>
                <option v-for="med in medicosDisponiveis" :key="med.nome" :value="med">{{ med.nome }}</option>
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

@Options({
    components: {
        NavbarPaciente
    }
})
export default class AgendarConsulta extends Vue {

    //data selecionada
    dataSelecionada: string | null = null

    //especialidades
    especialidades = [
        'Alergologia', 'Ortopedia', 'Cardiologia', 'Dermatologia', 'Gastroenterologia',
        'Geriatria', 'Hematologia', 'Infectologia', 'Nefrologia', 'Neurologia',
        'Oncologia', 'Pneumologia', 'Reumatologia', 'Pediatria'
    ]

    //horario atendimento
    horariosAtendimento = [
        '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00',
        '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
        '16:00 - 17:00', '17:00 - 18:00'
    ]

    // Lista de médicos simulada
    medicos = [
        { nome: 'Dr. João Silva', especialidade: 'Cardiologia', horarios: ['07:00 - 08:00', '09:00 - 10:00', '14:00 - 15:00'] },
        { nome: 'Dra. Mariana Santos', especialidade: 'Cardiologia', horarios: ['08:00 - 09:00', '10:00 - 11:00', '15:00 - 16:00'] },

        { nome: 'Dr. Ana Souza', especialidade: 'Dermatologia', horarios: ['09:00 - 10:00', '11:00 - 12:00', '16:00 - 17:00'] },
        { nome: 'Dra. Letícia Almeida', especialidade: 'Dermatologia', horarios: ['07:00 - 08:00', '10:00 - 11:00', '13:00 - 14:00'] },

        { nome: 'Dr. Carlos Mendes', especialidade: 'Ortopedia', horarios: ['08:00 - 09:00', '12:00 - 13:00', '17:00 - 18:00'] },
        { nome: 'Dra. Beatriz Castro', especialidade: 'Ortopedia', horarios: ['09:00 - 10:00', '14:00 - 15:00', '16:00 - 17:00'] },

        { nome: 'Dr. Fernando Lopes', especialidade: 'Neurologia', horarios: ['07:00 - 08:00', '09:00 - 10:00', '15:00 - 16:00'] },
        { nome: 'Dra. Carla Ferreira', especialidade: 'Neurologia', horarios: ['08:00 - 09:00', '12:00 - 13:00', '14:00 - 15:00'] },

        { nome: 'Dr. Henrique Oliveira', especialidade: 'Gastroenterologia', horarios: ['07:00 - 08:00', '10:00 - 11:00', '13:00 - 14:00'] },
        { nome: 'Dra. Silvia Ramos', especialidade: 'Gastroenterologia', horarios: ['09:00 - 10:00', '12:00 - 13:00', '15:00 - 16:00'] },

        { nome: 'Dr. Rafael Lima', especialidade: 'Geriatria', horarios: ['08:00 - 09:00', '11:00 - 12:00', '14:00 - 15:00'] },
        { nome: 'Dra. Márcia Andrade', especialidade: 'Geriatria', horarios: ['07:00 - 08:00', '10:00 - 11:00', '13:00 - 14:00'] },

        { nome: 'Dr. Daniel Costa', especialidade: 'Hematologia', horarios: ['07:00 - 08:00', '09:00 - 10:00', '16:00 - 17:00'] },
        { nome: 'Dra. Renata Souza', especialidade: 'Hematologia', horarios: ['08:00 - 09:00', '11:00 - 12:00', '17:00 - 18:00'] },

        { nome: 'Dr. Lucas Nogueira', especialidade: 'Infectologia', horarios: ['08:00 - 09:00', '10:00 - 11:00', '14:00 - 15:00'] },
        { nome: 'Dra. Fernanda Barros', especialidade: 'Infectologia', horarios: ['09:00 - 10:00', '12:00 - 13:00', '16:00 - 17:00'] },

        { nome: 'Dr. Eduardo Martins', especialidade: 'Nefrologia', horarios: ['07:00 - 08:00', '10:00 - 11:00', '15:00 - 16:00'] },
        { nome: 'Dra. Amanda Silva', especialidade: 'Nefrologia', horarios: ['09:00 - 10:00', '12:00 - 13:00', '17:00 - 18:00'] },

        { nome: 'Dr. Guilherme Rocha', especialidade: 'Oncologia', horarios: ['08:00 - 09:00', '11:00 - 12:00', '16:00 - 17:00'] },
        { nome: 'Dra. Juliana Ribeiro', especialidade: 'Oncologia', horarios: ['07:00 - 08:00', '10:00 - 11:00', '13:00 - 14:00'] },

        { nome: 'Dr. Tiago Mendes', especialidade: 'Pneumologia', horarios: ['09:00 - 10:00', '12:00 - 13:00', '15:00 - 16:00'] },
        { nome: 'Dra. Patrícia Lima', especialidade: 'Pneumologia', horarios: ['08:00 - 09:00', '11:00 - 12:00', '17:00 - 18:00'] },

        { nome: 'Dr. André Carvalho', especialidade: 'Reumatologia', horarios: ['07:00 - 08:00', '10:00 - 11:00', '16:00 - 17:00'] },
        { nome: 'Dra. Larissa Duarte', especialidade: 'Reumatologia', horarios: ['09:00 - 10:00', '12:00 - 13:00', '15:00 - 16:00'] },

        { nome: 'Dr. Roberto Oliveira', especialidade: 'Pediatria', horarios: ['08:00 - 09:00', '11:00 - 12:00', '14:00 - 15:00'] },
        { nome: 'Dra. Tatiane Costa', especialidade: 'Pediatria', horarios: ['07:00 - 08:00', '10:00 - 11:00', '13:00 - 14:00'] },

        { nome: 'Dr. Miguel Santos', especialidade: 'Alergologia', horarios: ['09:00 - 10:00', '12:00 - 13:00', '16:00 - 17:00'] },
        { nome: 'Dra. Rafaela Monteiro', especialidade: 'Alergologia', horarios: ['08:00 - 09:00', '11:00 - 12:00', '14:00 - 15:00'] }
    ]

    // Variáveis de estado
    especialidadeSelecionada = ''
    medicoSelecionado: any = null
    horarioSelecionado = ''
    medicosDisponiveis: any[] = []

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