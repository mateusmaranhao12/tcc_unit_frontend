<template>
    <!-- Alerta aparece quando há uma mensagem -->
    <div v-if="mensagem_alerta" :class="estiloAlerta"
        class="flex items-center justify-center p-4 rounded-lg shadow-md mb-4 mt-4">
        <i :class="mensagem_alerta.icone" class="text-xl mr-2"></i>
        <span class="text-sm font-semibold">{{ mensagem_alerta.mensagem }}</span>
    </div>

    <form @submit.prevent="cadastrarMedico" class="form-cadastro grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        <!-- Nome -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome <span class="text-red-800">*</span></label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Sobrenome <span
                    class="text-red-800">*</span></label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">E-mail <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-10">
                    <i class="fa-solid fa-envelope text-xl"></i>
                </div>
                <input type="text" v-model="medico.email" placeholder="E-mail"
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
                <input @input="validarSenha" :type="senhaVisivel ? 'text' : 'password'" v-model="medico.senha"
                    placeholder="Senha"
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

        <!-- Genero -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Gênero <span
                    class="text-red-800">*</span></label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">CRM <span class="text-red-800">*</span></label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Especialidade <span
                    class="text-red-800">*</span></label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Telefone <span
                    class="text-red-800">*</span></label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento <span
                    class="text-red-800">*</span></label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">CPF <span class="text-red-800">*</span></label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Endereço <span
                    class="text-red-800">*</span></label>
            <div class="relative flex items-center h-10 w-full">
                <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                    <i class="fa-solid fa-map-marker-alt text-xl"></i>
                </div>
                <input type="text" v-model="medico.endereco" placeholder="Endereço do Consultório"
                    class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
            </div>
        </div>

        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Horários de Atendimento <span
                    class="text-red-800">*</span></label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <label v-for="horario in horariosAtendimento" :key="horario" class="flex items-center cursor-pointer">
                    <!-- Checkbox -->
                    <input type="checkbox" :value="horario" v-model="medico.horarios" class="hidden peer">
                    <!-- Ícone do checkbox customizado -->
                    <div
                        class="w-5 h-5 border-2 border-gray-400 rounded-md peer-checked:bg-green-600 peer-checked:border-green-600 flex items-center justify-center transition">
                        <i class="fa-solid fa-check text-white text-xs" v-if="medico.horarios.includes(horario)"></i>
                    </div>
                    <!-- Texto que pode ser clicado -->
                    <span class="ml-2 text-gray-700">{{ horario }}</span>
                </label>
            </div>
        </div>

        <!-- Valor da Consulta -->
        <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Valor da Consulta <span
                    class="text-red-800">*</span></label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil <span
                    class="text-red-800">*</span></label>
            <div class="flex items-center space-x-4">
                <!-- Círculo para a Pré-visualização da Imagem -->
                <div v-if="medico.imagem" class="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden">
                    <img :src="medico.imagem" alt="Foto de Perfil" class="w-full h-full object-cover">
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
import axios from 'axios'
import { Options, Vue } from 'vue-class-component'
import { mask } from 'vue-the-mask'

@Options({

    emits: ['submit'],
    directives: {
        mask
    }
})

export default class CadastroMedico extends Vue {

    // Alerta
    mensagem_alerta: { icone: string, mensagem: string, status: 'sucesso' | 'erro' } | null = null

    //senha
    senhaVisivel = false
    mensagemSenha = ''
    corMensagemSenha = ''

    // Dados do Médico
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
        horarios: [] as string[],
        valorConsulta: '',
        imagem: ''
    }

    especialidades = [
        'Alergologia', 'Ortopedia', 'Cardiologia', 'Dermatologia', 'Gastroenterologia',
        'Geriatria', 'Hematologia', 'Infectologia', 'Nefrologia', 'Neurologia',
        'Oncologia', 'Pneumologia', 'Reumatologia'
    ]

    horariosAtendimento = [
        '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00',
        '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
        '16:00 - 17:00', '17:00 - 18:00'
    ]

    //cadastrar medico
    async cadastrarMedico() {
        try {
            console.log('Enviando dados do médico para o backend...')

            // Validação da Imagem antes do cadastro
            const inputImagem = this.$refs.inputImagem as HTMLInputElement | null
            const file = inputImagem?.files?.[0] ?? null

            if (!this.validarImagem(file)) {
                return
            }

            const payload = {
                ...this.medico,
                horarios: JSON.stringify(this.medico.horarios)
            }

            const response = await axios.post('http://localhost/Projetos/tcc_unit/backend/api/cadastrar_medico.php', payload)

            console.log('Resposta do servidor:', response.data)

            if (response.data.success) {
                this.mostrarMensagemAlerta('fa-solid fa-circle-check', 'Médico cadastrado com sucesso!', 'sucesso')
                this.limparFormulario()
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', response.data.message, 'erro')
            }

        } catch (error) {
            console.error('Erro na requisição:', error)
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao conectar ao servidor', 'erro')
        }
    }

    //limpar formulario
    private limparFormulario() {
        this.medico.nome = '',
            this.medico.sobrenome = '',
            this.medico.email = '',
            this.medico.senha = '',
            this.medico.dataNascimento = '',
            this.medico.genero = '',
            this.medico.crm = '',
            this.medico.especialidade = '',
            this.medico.telefone = '',
            this.medico.cpf = '',
            this.medico.endereco = '',
            this.medico.horarios = [],
            this.medico.valorConsulta = '',
            this.medico.imagem = ''

        this.mensagemSenha = ''
        this.corMensagemSenha = ''

        // Reseta o input de imagem
        const inputImagem = this.$refs.inputImagem as HTMLInputElement | null
        if (inputImagem) {
            inputImagem.value = ''
        }
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

    // Validação de imagem (somente png, svg, jpg, jpeg)
    public validarImagem(file: File | null): boolean {
        if (!file) {
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Nenhuma imagem selecionada.', 'erro')
            return false
        }

        const tiposPermitidos = ['image/png', 'image/svg+xml', 'image/jpg', 'image/jpeg']
        if (!tiposPermitidos.includes(file.type)) {
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Formato de imagem inválido. Use PNG, SVG, JPG ou JPEG.', 'erro')
            return false
        }

        return true
    }

    //mostrar senha
    public toggleSenha() {
        this.senhaVisivel = !this.senhaVisivel
    }

    //validar senha
    public validarSenha() {

        const senha = this.medico.senha
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