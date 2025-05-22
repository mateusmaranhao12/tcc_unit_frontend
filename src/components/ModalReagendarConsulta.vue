<template>
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Reagendar Consulta</h2>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Nova data (YYYY-MM-DD):</label>
                <input v-model="data" type="date" :min="minDate"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Novo horário:</label>
                <select v-model="horario"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500">
                    <option disabled value="">Selecione um horário</option>
                    <option v-for="h in horariosDisponiveis" :key="h" :value="h">{{ h }}</option>
                </select>
            </div>

            <div class="flex justify-end gap-2">
                <button @click="$emit('cancelar')"
                    class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer">
                    Cancelar
                </button>
                <button @click="confirmar" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                    Confirmar
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    props: {
        idMedico: { type: Number, required: true }
    },
    data() {
        return {
            data: '',
            horario: '',
            horariosDisponiveis: [] as string[]
        }
    },

    computed: {
        minDate(): string {
            const now = new Date()
            const offsetMs = now.getTimezoneOffset() * 60000
            const brasiliaNow = new Date(now.getTime() - offsetMs)

            const year = brasiliaNow.getFullYear()
            const month = String(brasiliaNow.getMonth() + 1).padStart(2, '0')
            const day = String(brasiliaNow.getDate()).padStart(2, '0')

            return `${year}-${month}-${day}`
        }
    },

    watch: {
        data(novaData) {
            if (!novaData) return
            console.log('Buscando horários para:', novaData, 'ID médico:', this.idMedico)
            axios.get('http://localhost/Projetos/tcc_unit/backend/api/horarios_disponiveis.php', {
                params: {
                    data_consulta: novaData,
                    id_medico: this.idMedico
                }
            }).then(res => {
                console.log('Resposta da API:', res.data)
                if (res.data.success) {
                    this.horariosDisponiveis = res.data.horarios
                    this.horario = ''
                }
            }).catch(err => {
                console.error('Erro ao buscar horários disponíveis', err)
            })
        }
    },

    methods: {
        confirmar() {
            if (!this.data || !this.horario) return
            this.$emit('confirmar', { data: this.data, horario: this.horario })
        }
    }
})
</script>
