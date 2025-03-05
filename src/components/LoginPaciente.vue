<template>
    <!-- Alerta -->
    <div v-if="mensagem_alerta" :class="estiloAlerta"
        class="flex items-center justify-center p-4 rounded-lg shadow-md mb-4 mt-4">
        <i :class="mensagem_alerta.icone" class="text-xl mr-2"></i>
        <span class="text-sm font-semibold">{{ mensagem_alerta.mensagem }}</span>
    </div>

    <form @submit.prevent="fazerLoginPaciente" class="form-login grid grid-cols-1 gap-6 mt-6">
        <!-- Email -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <div class="relative flex items-center">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-envelope text-xl"></i>
                </div>
                <input type="email" v-model="loginPaciente.email" placeholder="E-mail"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">
            </div>
        </div>

        <!-- Senha -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div class="relative flex items-center">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-lock text-xl"></i>
                </div>
                <input type="password" v-model="loginPaciente.senha" placeholder="Senha"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">
            </div>
        </div>

        <div class="flex justify-end">
            <button type="submit" class="btn-submit">Fazer login</button>
        </div>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'

@Options({})
export default class LoginPaciente extends Vue {
    loginPaciente = {
        email: '',
        senha: ''
    }

    // Alerta
    mensagem_alerta: { icone: string, mensagem: string, status: 'sucesso' | 'erro' } | null = null

    //login paciente
    async fazerLoginPaciente() {
        try {
            const response = await axios.post('http://localhost/Projetos/tcc_unit/backend/api/login_paciente.php', this.loginPaciente)
            if (response.data.success) {
                localStorage.setItem('userRole', 'paciente')
                this.$router.push('/menu-paciente')
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', response.data.message, 'erro')
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error)
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao tentar fazer login. Tente novamente mais tarde.', 'erro')
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
            : 'bg-red-100 text-red-800 border border-red-500';
    }
}
</script>