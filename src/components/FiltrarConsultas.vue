<template>
    <div class="mb-4">
        <label for="filtro" class="block text-sm font-medium text-gray-700 mb-1">Filtrar por status:</label>
        <select v-model="filtroSelecionado" @change="$emit('filtro-alterado', filtroSelecionado)" id="filtro"
            class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            <option value="todos">Todos</option>
            <option value="agendada">Agendadas</option>
            <option value="realizada">Realizadas</option>
            <option value="cancelada">Canceladas</option>
            <option value="online">Online (Telemedicina)</option>
            <option value="presencial">Presenciais</option>

        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            filtroSelecionado: 'todos'
        }
    }
})
</script>
