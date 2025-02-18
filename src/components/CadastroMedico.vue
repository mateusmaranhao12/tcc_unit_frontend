<template>
    <form @submit.prevent="submitForm"
        class="form-cadastro grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        <!-- Nome -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <div class="relative flex items-center">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-user text-xl"></i>
                </div>
                <input type="text" v-model="medico.nome" placeholder="Nome"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">
            </div>
        </div>

        <!-- Sobrenome -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
            <div class="relative flex items-center">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-user text-xl"></i>
                </div>
                <input type="text" v-model="medico.sobrenome" placeholder="Sobrenome"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">
            </div>
        </div>

        <!-- Email -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <div class="relative flex items-center">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-envelope text-xl"></i>
                </div>
                <input type="email" v-model="medico.email" placeholder="E-mail"
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
                <input type="password" v-model="medico.senha" placeholder="Senha"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">
            </div>
        </div>

        <!-- Genero -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-venus-mars text-xl"></i>
                </div>
                <select v-model="medico.genero"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
                    <option value="">Selecione o Gênero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
        </div>

        <!--CRM-->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">CRM</label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-id-card text-xl"></i>
                </div>
                <input type="text" v-model="medico.crm" placeholder="CRM"
                    class="input-field input-half border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!-- Especialidade -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-user-md text-xl"></i>
                </div>
                <select v-model="medico.especialidade"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
                    <option value="">Selecione a Especialidade</option>
                    <option v-for="esp in especialidades" :key="esp" :value="esp">{{ esp }}</option>
                </select>
            </div>
        </div>

        <!--Telefone-->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-phone text-xl"></i>
                </div>
                <input type="text" v-model="medico.telefone" placeholder="Telefone"
                    class="input-field input-half border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!-- Data de Nascimento -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-calendar text-xl"></i>
                </div>
                <input type="date" v-model="medico.dataNascimento"
                    class="input-field input-half border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!--CPF-->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">CPF</label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-id-card text-xl"></i>
                </div>
                <input type="text" v-model="medico.cpf" placeholder="CPF"
                    class="input-field input-half border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!-- Endereço -->
        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-map-marker-alt text-xl"></i>
                </div>
                <input type="text" v-model="medico.endereco" placeholder="Endereço do Consultório"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!-- Horário de Atendimento -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Horário de Atendimento</label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-clock text-xl"></i>
                </div>
                <input type="text" v-model="medico.horario" placeholder="Horário de Atendimento"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!-- Valor da Consulta -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Valor da Consulta</label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-brazilian-real-sign text-xl"></i>
                </div>
                <input type="text" v-model="medico.valorConsulta" placeholder="Valor da Consulta"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!-- Foto de Perfil -->
        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
            <input style="cursor: pointer;" type="file" @change="uploadImagem" accept="image/*"
                class="input-field border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
        </div>

        <div class="flex justify-end col-span-2">
            <button type="submit" class="btn-submit">Cadastrar</button>
        </div>
    </form>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    emits: ['submit']
})

export default class CadastroMedico extends Vue {

    medico = {
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        dataNascimento: '',
        genero: '',
        crm: '',
        especialidade: '',
        telefone: '',
        cpf: '',
        endereco: '',
        horario: '',
        valorConsulta: '',
        imagem: ''
    }

    uploadImagem(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.medico.imagem = URL.createObjectURL(file);
        }
    }

    especialidades = [
        'Alergologia', 'Ortopedia', 'Cardiologia', 'Dermatologia', 'Gastroenterologia',
        'Geriatria', 'Hematologia', 'Infectologia', 'Nefrologia', 'Neurologia',
        'Oncologia', 'Pneumologia', 'Reumatologia'
    ]

    submitForm() {
        this.$emit('submit', this.medico)
    }

}
</script>