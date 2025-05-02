<template>
    <div class="mt-6 p-4 bg-white shadow-md rounded-lg relative">
        <!-- Botão para fechar a rota filha -->
        <button @click="$router.push('/menu-medico')"
            class="absolute top-4 right-4 text-red-500 text-xl cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h2 class="text-2xl font-bold text-gray-800 mb-4">Consultas Futuras</h2>

        <div v-if="consultas.length" class="space-y-4">
            <div v-for="consulta in consultas" :key="consulta.id"
                class="bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                <div class="mb-2 md:mb-0 w-full md:w-auto">
                    <p class="text-lg font-semibold">{{ consulta.data }}</p>
                    <p class="text-gray-600">Paciente: {{ consulta.paciente }}</p>
                </div>
                <div class="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-auto">
                    <button v-if="consulta.data.includes('Hoje')" @click="finalizarConsulta(consulta.id)"
                        class="btn-finalizar w-full md:w-auto">
                        <i class="fa-solid fa-check"></i> Finalizar
                    </button>
                    <button @click="reagendarConsulta(consulta.id)" class="btn-reagendar w-full md:w-auto"><i
                            class="fa-solid fa-calendar-days"></i> Reagendar</button>
                    <button @click="desmarcarConsulta(consulta.id)" class="btn-desmarcar w-full md:w-auto"><i
                            class="fa-solid fa-xmark"></i> Desmarcar</button>
                </div>
            </div>
        </div>

        <p v-else class="text-gray-500 text-center">Nenhuma consulta futura encontrada.</p>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'

@Options({})
export default class ConsultasFuturas extends Vue {
    consultas: any[] = []

    async mounted() {
        const emailMedico = localStorage.getItem('medicoEmail')
        if (!emailMedico) return

        try {
            const response = await axios.get('http://localhost/Projetos/tcc_unit/backend/api/listar_consultas_medico.php', {
                params: { email: emailMedico }
            })

            if (response.data.success) {
                const hojeStr = new Date().toISOString().split('T')[0]

                this.consultas = response.data.consultas.map((c: any) => {
                    const dataOriginal = c.data_consulta
                    const horarioOriginal = c.horario_consulta
                    const horarioFormatado = horarioOriginal.replace(' - ', ' às ')

                    const [ano, mes, dia] = dataOriginal.split('-')

                    const dataFormatada = dataOriginal === hojeStr
                        ? `Hoje das ${horarioFormatado}`
                        : `${dia}/${mes}/${ano} das ${horarioFormatado}`

                    return {
                        id: c.id,
                        data: dataFormatada,
                        horario: horarioFormatado,
                        paciente: `${c.nome_paciente} ${c.sobrenome_paciente}`
                    }
                })
            }
        } catch (error) {
            console.error('Erro ao buscar consultas futuras:', error)
        }
    }

    reagendarConsulta(id: number) {
        console.log(`Reagendando consulta ${id}`)
    }

    desmarcarConsulta(id: number) {
        console.log(`Desmarcando consulta ${id}`)
    }

    finalizarConsulta(id: number) {
        console.log(`Finalizando consulta ${id}`)
    }
}
</script>
