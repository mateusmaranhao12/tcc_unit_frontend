<template>
    <div class="mt-6 p-4 bg-white shadow-md rounded-lg relative">
        <!-- Botão para fechar a rota filha -->
        <button @click="$router.push('/menu-paciente')" class="absolute top-4 right-4 text-red-500 text-xl cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h2 class="text-2xl font-bold text-gray-800 mb-4">Minhas Consultas</h2>

        <div v-if="consultas.length" class="space-y-4">
            <div v-for="consulta in consultas" :key="consulta.id"
                class="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <div>
                    <p class="text-lg font-semibold">{{ formatarData(consulta.data, consulta.horario) }}</p>
                    <p class="text-gray-600">Médico: {{ consulta.medico }}</p>
                </div>
                <div class="flex space-x-2">
                    <button v-if="consulta.data.includes('Hoje')" @click="finalizarConsulta(consulta.id)"
                        class="btn-finalizar">
                        <i class="fa-solid fa-check"></i> Finalizar
                    </button>
                    <button @click="reagendarConsulta(consulta.id)" class="btn-reagendar">
                        <i class="fa-solid fa-calendar-days"></i> Reagendar
                    </button>
                    <button @click="desmarcarConsulta(consulta.id)" class="btn-desmarcar">
                        <i class="fa-solid fa-xmark"></i> Desmarcar
                    </button>
                </div>
            </div>
        </div>

        <p v-else class="text-gray-500 text-center">Nenhuma consulta encontrada.</p>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class ConsultasPaciente extends Vue {
    consultas = [
        { id: 1, data: 'Hoje', horario: '14:00', medico: 'Dr. João Silva' },
        { id: 2, data: '2025-03-22', horario: '16:30', medico: 'Dra. Maria Oliveira' }
    ]

    formatarData(data: string, horario: string): string {
        return data === 'Hoje' ? `Hoje às ${horario}` : `${data} às ${horario}`
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
