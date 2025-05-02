<template>
    <div class="mt-6 p-4 bg-white shadow-md rounded-lg relative">
        <!-- Botão para fechar a rota filha -->
        <button @click="$router.push('/menu-paciente')"
            class="absolute top-4 right-4 text-red-500 text-xl cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h2 class="text-2xl font-bold text-gray-800 mb-4">Minhas Consultas</h2>

        <div v-if="consultas.length" class="space-y-4">
            <div v-for="consulta in consultas" :key="consulta.id"
                class="bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                <div class="mb-2 md:mb-0 w-full md:w-auto">
                    <p class="text-lg font-semibold">{{ formatarData(consulta.data, consulta.horario) }}</p>
                    <p class="text-gray-600">Médico: {{ consulta.medico }}</p>
                </div>
                <div class="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-auto">
                    <button v-if="consulta.data.includes('Hoje')" @click="finalizarConsulta(consulta.id)"
                        class="btn-finalizar w-full md:w-auto">
                        <i class="fa-solid fa-check"></i> Finalizar
                    </button>
                    <button @click="reagendarConsulta(consulta.id)" class="btn-reagendar w-full md:w-auto">
                        <i class="fa-solid fa-calendar-days"></i> Reagendar
                    </button>
                    <button @click="desmarcarConsulta(consulta.id)" class="btn-desmarcar w-full md:w-auto">
                        <i class="fa-solid fa-xmark"></i> Desmarcar
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

@Options({})
export default class ConsultasPaciente extends Vue {
    consultas: any[] = []

    async mounted() {
        const emailPaciente = localStorage.getItem('pacienteEmail')
        if (!emailPaciente) return

        try {
            const response = await axios.get('http://localhost/Projetos/tcc_unit/backend/api/listar_consultas_paciente.php', {
                params: { email: emailPaciente }
            })

            if (response.data.success) {
                const hojeStr = new Date().toISOString().split('T')[0]
                this.consultas = response.data.consultas.map((c: any) => {
                    return {
                        ...c,
                        data: c.data_consulta === hojeStr ? 'Hoje' : c.data_consulta,
                        horario: c.horario_consulta,
                        medico: `${c.nome_medico} ${c.sobrenome_medico}`
                    }
                })
            }
        } catch (error) {
            console.error('Erro ao buscar consultas:', error)
        }
    }

    formatarData(data: string, horario: string): string {
        if (data === 'Hoje') {
            return `Hoje às ${horario}`
        }

        const [ano, mes, dia] = data.split('-')
        return `${dia}/${mes}/${ano} às ${horario}`
    }

    finalizarConsulta(id: number) {
        console.log(`Finalizando consulta ${id}`)
    }

    reagendarConsulta(id: number) {
        console.log(`Reagendando consulta ${id}`)
    }

    desmarcarConsulta(id: number) {
        console.log(`Cancelando consulta ${id}`)
    }
}
</script>
