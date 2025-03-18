<template>
    <div class="mt-6 p-4 bg-white shadow-md rounded-lg relative">
        <!-- Botão para fechar a rota filha -->
        <button @click="$router.push('/menu-medico')" class="absolute top-4 right-4 text-red-500 text-xl cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h2 class="text-2xl font-bold text-gray-800 mb-4">Consultas Futuras</h2>

        <div v-if="consultas.length" class="space-y-4">
            <div v-for="consulta in consultas" :key="consulta.id"
                class="bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                <div class="mb-2 md:mb-0 w-full md:w-auto">
                    <p class="text-lg font-semibold">{{ consulta.data }} - {{ consulta.horario }}</p>
                    <p class="text-gray-600">Paciente: {{ consulta.paciente }}</p>
                </div>
                <div class="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-auto">
                    <button @click="reagendarConsulta(consulta.id)"
                        class="btn-reagendar w-full md:w-auto"><i class="fa-solid fa-calendar-days"></i> Reagendar</button>
                    <button @click="desmarcarConsulta(consulta.id)"
                        class="btn-desmarcar w-full md:w-auto"><i class="fa-solid fa-xmark"></i> Desmarcar</button>
                </div>
            </div>
        </div>

        <p v-else class="text-gray-500 text-center">Nenhuma consulta futura encontrada.</p>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class ConsultasFuturas extends Vue {
    consultas = [
        { id: 1, data: '20/03/2025', horario: '14:00', paciente: 'João Silva' },
        { id: 2, data: '22/03/2025', horario: '16:30', paciente: 'Maria Oliveira' }
    ]

    reagendarConsulta(id: number) {
        console.log(`Reagendando consulta ${id}`)
    }

    desmarcarConsulta(id: number) {
        console.log(`Desmarcando consulta ${id}`)
    }
}
</script>