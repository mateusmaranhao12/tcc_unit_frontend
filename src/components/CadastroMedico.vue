<template>
    <form @submit.prevent="submitForm" class="form-cadastro grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

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
                <!-- Ícone do Cadeado -->
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-lock text-xl"></i>
                </div>

                <!-- Input de Senha -->
                <input :type="senhaVisivel ? 'text' : 'password'" v-model="medico.senha" placeholder="Senha"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">

                <!-- Ícone de Olho para Mostrar/Ocultar Senha -->
                <button type="button" @click="toggleSenha"
                    class="absolute right-2 cursor-pointer text-green-600 hover:text-green-800 focus:outline-none">
                    <i :class="senhaVisivel ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                </button>
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
                <input type="text" v-mask="'#######'" v-model="medico.crm" placeholder="CRM"
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
                <input type="text" v-mask="'(##) #####-####'" v-model="medico.telefone" placeholder="Telefone"
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
                <input type="text" v-model="medico.cpf" v-mask="'###.###.###-##'" placeholder="CPF"
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
                <select v-model="medico.horario"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
                    <option value="">Selecione um horário</option>
                    <option v-for="horario in horariosAtendimento" :key="horario" :value="horario">
                        {{ horario }}
                    </option>
                </select>
            </div>
        </div>


        <!-- Valor da Consulta -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Valor da Consulta</label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-brazilian-real-sign text-xl"></i>
                </div>
                <input type="text" v-model="medico.valorConsulta" @input="formatarValorConsulta"
                    placeholder="Valor da Consulta"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!-- Foto de Perfil -->
        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
            <div class="flex items-center space-x-4">
                <!-- Círculo para a Pré-visualização da Imagem -->
                <div v-if="medico.imagem" class="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden">
                    <img :src="medico.imagem" alt="Foto de Perfil" class="w-full h-full object-cover">
                </div>

                <!-- Input de Upload de Imagem -->
                <input style="cursor: pointer;" type="file" @change="uploadImagem" accept="image/*"
                    class="input-field border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <div class="flex justify-end col-span-2">
            <button type="submit" class="btn-submit">Cadastrar</button>
        </div>
    </form>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { mask } from 'vue-the-mask'

@Options({
    emits: ['submit'],
    directives: {
        mask
    }
})

export default class CadastroMedico extends Vue {

    senhaVisivel = false

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

    especialidades = [
        'Alergologia', 'Ortopedia', 'Cardiologia', 'Dermatologia', 'Gastroenterologia',
        'Geriatria', 'Hematologia', 'Infectologia', 'Nefrologia', 'Neurologia',
        'Oncologia', 'Pneumologia', 'Reumatologia'
    ]

    horariosAtendimento = [
        '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
    ]

    submitForm() {
        this.$emit('submit', this.medico)
    }

    //formatar valor da consulta
    formatarValorConsulta(event: Event) {
        let valor = (event.target as HTMLInputElement).value

        // Remove qualquer caractere que não seja número ou vírgula
        valor = valor.replace(/[^0-9,]/g, '')

        // Atualiza o campo formatado
        this.medico.valorConsulta = valor
    }

    // Upload de Imagem e Atualização do Preview
    public uploadImagem(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.medico.imagem = URL.createObjectURL(file);
        }
    }

    //mostrar senha
    public toggleSenha() {
        this.senhaVisivel = !this.senhaVisivel
    }

}
</script>