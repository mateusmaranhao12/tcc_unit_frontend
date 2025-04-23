<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <button class="back-menu" @click="voltarMenuInicial"><i class="fa-solid fa-chevron-left"></i> Voltar ao menu
                inicial</button>
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Editar perfil</h2>

            <form @submit.prevent="salvarAlteracoes" class="form-cadastro grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                <!-- Nome -->
                <div class="col-span-2 md:col-span-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome <span
                            class="text-red-800">*</span></label>
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
                        <input type="text" v-model="paciente.email" placeholder="E-mail"
                            class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">
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
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento <span
                            class="text-red-800">*</span></label>
                    <div class="relative flex items-center h-10 w-full">
                        <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                            <i class="fa-solid fa-calendar text-xl"></i>
                        </div>
                        <input :max="dataMaxima" type="date" v-model="paciente.dataNascimento"
                            class="input-field input-half border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
                    </div>
                </div>

                <!--CPF-->
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">CPF <span
                            class="text-red-800">*</span></label>
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
                            <option v-for="convenio in listaConvenios" :key="convenio" :value="convenio">{{ convenio }}
                            </option>
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
                        <div v-if="paciente.imagem"
                            class="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden">
                            <img :src="paciente.imagem" alt="Foto de Perfil" class="w-full h-full object-cover">
                        </div>

                        <!-- Input de Upload de Imagem -->
                        <input ref="inputImagem" style="cursor: pointer;" type="file" @change="uploadImagem"
                            accept="image/*"
                            class="input-field border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
                    </div>
                </div>

                <!-- Botão de Salvar -->
                <div class="col-span-2 flex justify-end">
                    <button type="submit" class="btn-save">Salvar Alterações</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Options, Vue } from 'vue-class-component'
import { mask } from 'vue-the-mask'

@Options({
    components: {
    },

    directives: {
        mask
    }
})

export default class AlterarDadosPerfilPaciente extends Vue {

    paciente = {
        nome: '',
        sobrenome: '',
        email: '',
        dataNascimento: '',
        cpf: '',
        endereco: '',
        telefone: '',
        genero: '',
        convenio: '',
        historico: '',
        imagem: ''
    }

    //exibicao de senha
    senhaVisivel = false

    //obter dados do paciente
    mounted() {
        const email = localStorage.getItem('pacienteEmail')
        if (email) {
            axios.get(`http://localhost/Projetos/tcc_unit/backend/api/perfil_paciente.php?email=${email}`)
                .then(response => {
                    if (response.data.success) {
                        this.paciente = response.data.paciente
                    } else {
                        console.warn(response.data.message)
                    }
                })
                .catch(err => {
                    console.error('Erro ao buscar dados do paciente:', err)
                })
        }
    }

    toggleSenha() {
        this.senhaVisivel = !this.senhaVisivel
    }

    //salvar alteracoes
    salvarAlteracoes() {
        console.log("Alterações salvas:", this.paciente)
    }

    // Lista de convênios
    listaConvenios = [
        'Amil', 'Bradesco Saúde', 'Golden Cross', 'Hapvida', 'NotreDame Intermédica',
        'Porto Seguro Saúde', 'SulAmérica Saúde', 'Unimed', 'São Francisco Saúde', 'Outros'
    ]

    // Upload de Imagem e Atualização do Preview
    public uploadImagem(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
            this.paciente.imagem = URL.createObjectURL(file)
        }
    }

    //voltar ao menu inicial
    public voltarMenuInicial() {
        this.$router.push('/menu-paciente')
    }

    //data maxima
    dataMaxima: string = new Date().toISOString().split('T')[0]

}

</script>

<style lang="scss">
@import '../scss/forms.scss';
</style>
