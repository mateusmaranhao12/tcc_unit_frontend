<template>
    <form @submit.prevent="cadastrarPaciente" class="form-cadastro grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        <!-- Nome -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome <span class="text-red-800">*</span></label>
            <div class="relative flex items-center">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-user text-xl"></i>
                </div>
                <input type="text" v-model="paciente.nome" placeholder="Nome"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">
            </div>
        </div>

        <!-- Sobrenome -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Sobrenome <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-user text-xl"></i>
                </div>
                <input type="text" v-model="paciente.sobrenome" placeholder="Sobrenome"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">
            </div>
        </div>

        <!-- Email -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">E-mail <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-envelope text-xl"></i>
                </div>
                <input type="email" v-model="paciente.email" placeholder="E-mail"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">
            </div>
        </div>

        <!-- Senha -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Senha <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center">
                <!-- Ícone do Cadeado -->
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-lock text-xl"></i>
                </div>

                <!-- Input de Senha -->
                <input :type="senhaVisivel ? 'text' : 'password'" v-model="paciente.senha" placeholder="Senha"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">

                <!-- Ícone de Olho para Mostrar/Ocultar Senha -->
                <button type="button" @click="toggleSenha"
                    class="absolute right-2 cursor-pointer text-green-600 hover:text-green-800 focus:outline-none">
                    <i :class="senhaVisivel ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                </button>
            </div>
        </div>

        <!--Telefone-->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Telefone <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-phone text-xl"></i>
                </div>
                <input type="text" v-model="paciente.telefone" v-mask="'(##) #####-####'" placeholder="Telefone"
                    class="input-field input-half border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!-- Data de Nascimento -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-calendar text-xl"></i>
                </div>
                <input type="date" v-model="paciente.dataNascimento"
                    class="input-field input-half border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!--CPF-->
        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">CPF <span class="text-red-800">*</span></label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-id-card text-xl"></i>
                </div>
                <input type="text" v-model="paciente.cpf" v-mask="'###.###.###-##'" placeholder="CPF"
                    class="input-field input-half border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!-- Endereço -->
        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Endereço <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-map-marker-alt text-xl"></i>
                </div>
                <input type="text" v-model="paciente.endereco" placeholder="Endereço"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <!--Gênero-->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Gênero <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-venus-mars text-xl"></i>
                </div>
                <select v-model="paciente.genero"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
                    <option value="">Selecione o Gênero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
        </div>

        <!-- Convênio -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Convênio ou Particular <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-hospital text-xl"></i>
                </div>
                <select v-model="paciente.convenio"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
                    <option value="">Selecione um Convênio</option>
                    <option value="Particular">Particular</option>
                    <option v-for="convenio in listaConvenios" :key="convenio" :value="convenio">{{ convenio }}</option>
                </select>
            </div>
        </div>

        <!-- Histórico Médico -->
        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Histórico Médico</label>
            <div class="relative flex items-start w-full">
                <textarea v-model="paciente.historico" placeholder="Histórico Médico"
                    class="input-field rounded-l-none border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none w-full h-28 resize-none"></textarea>
            </div>
        </div>

        <!-- Foto de Perfil -->
        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
            <div class="flex items-center space-x-4">
                <!-- Círculo para a Pré-visualização da Imagem -->
                <div v-if="paciente.imagem" class="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden">
                    <img :src="paciente.imagem" alt="Foto de Perfil" class="w-full h-full object-cover">
                </div>

                <!-- Input de Upload de Imagem -->
                <input ref="inputImagem" style="cursor: pointer;" type="file" @change="uploadImagem" accept="image/*"
                    class="input-field border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <div class="flex justify-end col-span-2">
            <button type="submit" class="btn-submit">Cadastrar</button>
        </div>
    </form>
</template>
<script lang="ts">
import axios from 'axios';
import { Options, Vue } from 'vue-class-component'
import { mask } from 'vue-the-mask'

@Options({

    emits: ['submit'],

    directives: {
        mask
    }
})
export default class CadastroPaciente extends Vue {

    senhaVisivel = false

    paciente = {
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        dataNascimento: '',
        cpf: '',
        endereco: '',
        telefone: '',
        genero: '',
        convenio: '',
        historico: '',
        imagem: ''
    }

    // Upload de Imagem e Atualização do Preview
    public uploadImagem(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.paciente.imagem = URL.createObjectURL(file);
        }
    }

    //lista de convenios
    listaConvenios = [
        'Amil', 'Bradesco Saúde', 'Golden Cross', 'Hapvida', 'NotreDame Intermédica',
        'Porto Seguro Saúde', 'SulAmérica Saúde', 'Unimed', 'São Francisco Saúde', 'Outros'
    ]

    //mostrar senha
    public toggleSenha() {
        this.senhaVisivel = !this.senhaVisivel
    }

    //cadastrar paciente
    async cadastrarPaciente() {
        try {
            console.log('Enviando dados do paciente para o backend...')

            // Enviar os dados para o backend (cadastrar_paciente.php)
            const response = await axios.post('http://localhost/Projetos/tcc_unit/backend/api/cadastrar_paciente.php', this.paciente)

            console.log('Resposta do servidor:', response.data)

            if (response.data.success) {
                alert('Paciente cadastrado com sucesso!')
                this.$emit('submit', this.paciente)
                this.limparFormulario()
            } else {
                alert('Erro ao cadastrar paciente: ' + response.data.message)
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
            alert('Erro ao conectar ao servidor.')
        }
    }

    private limparFormulario() {
        this.paciente.nome = '',
        this.paciente.sobrenome = '',
        this.paciente.email = '',
        this.paciente.senha = '',
        this.paciente.cpf = '',
        this.paciente.dataNascimento = '',
        this.paciente.endereco = '',
        this.paciente.telefone = '',
        this.paciente.genero = '',
        this.paciente.convenio = '',
        this.paciente.historico = '',
        this.paciente.imagem = ''

        // Reseta o input de imagem
        const inputImagem = this.$refs.inputImagem as HTMLInputElement | null
        if (inputImagem) {
            inputImagem.value = ''
        }
    }

}
</script>