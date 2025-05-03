<template>
    <div class="mt-6 p-4 bg-white shadow-md rounded-lg relative">
        <!-- Alerta aparece quando há uma mensagem -->
        <div v-if="mensagem_alerta" :class="estiloAlerta"
            class="flex items-center justify-center p-4 rounded-lg shadow-md mb-4 mt-4">
            <i :class="mensagem_alerta.icone" class="text-xl mr-2"></i>
            <span class="text-sm font-semibold">{{ mensagem_alerta.mensagem }}</span>
        </div>

        <!-- Botão para fechar a rota filha -->
        <button @click="$router.push('/menu-medico')"
            class="absolute top-4 right-4 text-red-500 text-xl cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h2 class="text-2xl font-bold text-gray-800 mb-4">Próximas consultas</h2>

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

    // Alerta
    mensagem_alerta: { icone: string, mensagem: string, status: 'sucesso' | 'erro' } | null = null

    async mounted() {
        const emailMedico = localStorage.getItem('medicoEmail')
        if (!emailMedico) return

        try {
            const response = await axios.get('http://localhost/Projetos/tcc_unit/backend/api/listar_consultas_medico.php', {
                params: { email: emailMedico }
            })

            if (response.data.success) {
                // Corrigir o fuso horário local para "hoje"
                const agora = new Date()
                const offsetMs = agora.getTimezoneOffset() * 60000
                const hojeLocal = new Date(agora.getTime() - offsetMs)
                const hojeStr = hojeLocal.toISOString().split('T')[0]

                this.consultas = response.data.consultas.map((c: any) => {
                    const dataOriginal = c.data_consulta
                    const horarioOriginal = c.horario_consulta
                    const horarioFormatado = horarioOriginal.replace(' - ', ' às ')

                    const [anoC, mesC, diaC] = dataOriginal.split('-')

                    const dataFormatada = dataOriginal === hojeStr
                        ? `Hoje das ${horarioFormatado}`
                        : `${diaC}/${mesC}/${anoC} das ${horarioFormatado}`

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

    //reagendar consulta
    reagendarConsulta(id: number) {
        console.log(`Reagendando consulta ${id}`)
    }

    //desmarcar consulta
    async desmarcarConsulta(id: number) {
        try {
            const response = await axios.post('http://localhost/Projetos/tcc_unit/backend/api/desmarcar_consulta.php', {
                id: id
            })

            if (response.data.success) {
                this.mostrarMensagemAlerta('fa-solid fa-check', 'Consulta desmarcada com sucesso!', 'sucesso')
                this.consultas = this.consultas.filter(c => c.id !== id)
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao desmarcar consulta: ' + response.data.message, 'erro')
            }
        } catch (error) {
            console.error('Erro ao desmarcar consulta:', error)
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao desmarcar consulta.', 'erro')
        }
    }

    //finalizar consulta
    async finalizarConsulta(id: number) {
        try {
            const response = await axios.post('http://localhost/Projetos/tcc_unit/backend/api/finalizar_consulta.php', {
                id: id
            })

            if (response.data.success) {
                this.mostrarMensagemAlerta('fa-solid fa-check', 'Consulta finalizada com sucesso!', 'sucesso')
                this.consultas = this.consultas.filter(c => c.id !== id)
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao finalizar consulta: ' + response.data.message, 'erro')
            }
        } catch (error) {
            console.error('Erro ao finalizar consulta:', error)
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao finalizar consulta.', 'erro')
        }
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
