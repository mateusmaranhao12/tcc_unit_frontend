<template>
    <!-- Alerta aparece quando há uma mensagem -->
    <div v-if="mensagem_alerta" :class="estiloAlerta"
        class="flex items-center justify-center p-4 rounded-lg shadow-md mb-4 mt-4">
        <i :class="mensagem_alerta.icone" class="text-xl mr-2"></i>
        <span class="text-sm font-semibold">{{ mensagem_alerta.mensagem }}</span>
    </div>

    <form @submit.prevent="cadastrarPaciente" class="form-cadastro grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        <!-- Nome -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome <span class="text-red-800">*</span></label>
            <div class="relative flex items-center">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-user text-xl"></i>
                </div>
                <input type="text" v-model="paciente.nome" placeholder="Nome"
                    :class="{ 'border-red-500': campoVazio('nome') }"
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
                <input :class="{ 'border-red-500': campoVazio('sobrenome') }" type="text" v-model="paciente.sobrenome"
                    placeholder="Sobrenome"
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
                <input :class="{ 'border-red-500': campoVazio('email') }" type="text" v-model="paciente.email"
                    placeholder="E-mail"
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
                <input :class="{ 'border-red-500': campoVazio('senha') }" @input="validarSenha"
                    :type="senhaVisivel ? 'text' : 'password'" v-model="paciente.senha" placeholder="Senha"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none h-full">

                <!-- Ícone de Olho para Mostrar/Ocultar Senha -->
                <button type="button" @click="toggleSenha"
                    class="absolute right-2 cursor-pointer text-green-600 hover:text-green-800 focus:outline-none">
                    <i :class="senhaVisivel ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                </button>
            </div>

            <!--Validar senha-->
            <span :style="{ color: corMensagemSenha }">{{ mensagemSenha }}</span>
        </div>

        <!--Telefone-->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Telefone <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-phone text-xl"></i>
                </div>
                <input :class="{ 'border-red-500': campoVazio('telefone') }" type="text" v-model="paciente.telefone"
                    v-mask="'(##) #####-####'" placeholder="Telefone"
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
                <input :max="dataMaxima" :class="{ 'border-red-500': campoVazio('dataNascimento') }" type="date"
                    v-model="paciente.dataNascimento"
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
                <input :class="{ 'border-red-500': campoVazio('cpf') }" type="text" v-model="paciente.cpf"
                    v-mask="'###.###.###-##'" placeholder="CPF"
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
                <input :class="{ 'border-red-500': campoVazio('endereco') }" type="text" v-model="paciente.endereco"
                    placeholder="Endereço"
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
                <select :class="{ 'border-red-500': campoVazio('genero') }" v-model="paciente.genero"
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
                <select :class="{ 'border-red-500': campoVazio('convenio') }" v-model="paciente.convenio"
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
    components: {},
    directives: { mask }
})
export default class CadastroPaciente extends Vue {

    // Alerta
    mensagem_alerta: { icone: string, mensagem: string, status: 'sucesso' | 'erro' } | null = null

    // Senha
    senhaVisivel = false
    mensagemSenha = ''
    corMensagemSenha = ''

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

    // Lista de convênios
    listaConvenios = [
        'Amil', 'Bradesco Saúde', 'Golden Cross', 'Hapvida', 'NotreDame Intermédica',
        'Porto Seguro Saúde', 'SulAmérica Saúde', 'Unimed', 'São Francisco Saúde', 'Outros'
    ]

    // Lista de campos obrigatórios vazios
    camposVazios: string[] = []

    // Lista de campos obrigatórios (excluindo 'historico' e 'imagem' que são opcionais)
    camposObrigatorios: (keyof typeof this.paciente)[] = [
        'nome',
        'sobrenome',
        'email',
        'senha',
        'dataNascimento',
        'cpf',
        'endereco',
        'telefone',
        'genero',
        'convenio'
    ]

    // Cadastrar paciente
    async cadastrarPaciente() {
        try {
            this.camposVazios = [] // Resetar os campos vazios

            // Valida apenas os campos obrigatórios
            this.camposObrigatorios.forEach(campo => {
                if (!this.paciente[campo]) {
                    this.camposVazios.push(campo)
                }
            })

            // Se houver campos vazios, não prossegue com o envio
            if (this.camposVazios.length > 0) {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Preencha todos os campos obrigatórios', 'erro')
                return
            }

            const response = await axios.post(
                'http://localhost/Projetos/tcc_unit/backend/api/cadastrar_paciente.php',
                this.paciente
            )

            if (response.data.success) {
                this.mostrarMensagemAlerta('fa-solid fa-circle-check', 'Paciente cadastrado com sucesso!', 'sucesso')
                this.limparFormulario()
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', response.data.message, 'erro')
            }

        } catch (error) {
            console.error('Erro na requisição:', error)
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao conectar ao servidor', 'erro')
        }
    }
    // Limpar formulário
    private limparFormulario() {
        this.paciente = {
            nome: '',
            sobrenome: '',
            email: '',
            senha: '',
            cpf: '',
            dataNascimento: '',
            endereco: '',
            telefone: '',
            genero: '',
            convenio: '',
            historico: '',
            imagem: ''
        }

        this.mensagemSenha = ''
        this.corMensagemSenha = ''

        // Reseta o input de imagem
        const inputImagem = this.$refs.inputImagem as HTMLInputElement | null;
        if (inputImagem) {
            inputImagem.value = ''
        }
    }

    // Mostrar senha
    public toggleSenha() {
        this.senhaVisivel = !this.senhaVisivel
    }

    //validar senha
    public validarSenha() {

        const senha = this.paciente.senha
        if (senha.length < 5) {
            this.mensagemSenha = 'Senha fraca'
            this.corMensagemSenha = 'red'
        } else if (senha.length >= 5 && senha.length < 8) {
            this.mensagemSenha = 'Vulnerável'
            this.corMensagemSenha = 'orange'
        } else if (senha.length >= 10 && !/[A-Z]/.test(senha)) {
            this.mensagemSenha = 'Forte'
            this.corMensagemSenha = 'green'
        } else if (senha.length >= 10 && /[A-Z]/.test(senha) && /[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            this.mensagemSenha = 'Senha muito forte'
            this.corMensagemSenha = 'darkgreen'
        } else if (senha.length >= 10) {
            this.mensagemSenha = 'Forte'
            this.corMensagemSenha = 'green'
        }

    }

    // Upload de Imagem e Atualização do Preview
    public uploadImagem(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.paciente.imagem = URL.createObjectURL(file);
        }
    }

    // Validação de imagem (somente png, svg, jpg, jpeg)
    public validarImagem(file: File | null): boolean {
        if (!file) {
            return false
        }

        const tiposPermitidos = ['image/png', 'image/svg+xml', 'image/jpg', 'image/jpeg']
        if (!tiposPermitidos.includes(file.type)) {
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Formato de imagem inválido. Use PNG, SVG, JPG ou JPEG.', 'erro')
            return false
        }

        return true
    }

    // Função para verificar se o campo está vazio e aplicar a borda vermelha
    public campoVazio(campo: keyof typeof this.paciente): boolean {
        return this.camposVazios.includes(campo)
    }

    //data maxima
    dataMaxima: string = new Date().toISOString().split('T')[0]

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