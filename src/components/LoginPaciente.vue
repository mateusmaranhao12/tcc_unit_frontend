<template>
    <form class="form-login grid grid-cols-1 gap-6 mt-6">
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

@Options({})
export default class LoginPaciente extends Vue {

    loginPaciente = {
        email: '',
        senha: ''
    }
    
}
</script>