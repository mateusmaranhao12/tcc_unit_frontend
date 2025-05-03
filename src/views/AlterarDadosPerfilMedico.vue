<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <button class="back-menu" @click="voltarMenuInicial"><i class="fa-solid fa-chevron-left"></i> Voltar ao menu
                inicial</button>
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Editar perfil</h2>

            <!-- Alerta -->
            <div v-if="mensagem_alerta" :class="estiloAlerta"
                class="flex items-center justify-center p-4 rounded-lg shadow-md mb-4 mt-4">
                <i :class="mensagem_alerta.icone" class="text-xl mr-2"></i>
                <span class="text-sm font-semibold">{{ mensagem_alerta.mensagem }}</span>
            </div>

            <form @submit.prevent="salvarAlteracoes" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                <!-- Nome -->
                <div class="col-span-2 md:col-span-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome <span
                            class="text-red-800">*</span></label>
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
                    <label class="block text-sm font-medium text-gray-700 mb-1">CRM <span
                            class="text-red-800">*</span></label>
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
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento <span
                            class="text-red-800">*</span></label>
                    <div class="relative flex items-center h-10 w-full">
                        <div class="bg-green-600 text-white px-4 py-2 rounded-l-md flex items-center shadow-md h-full">
                            <i class="fa-solid fa-calendar text-xl"></i>
                        </div>
                        <input :max="dataMaxima" type="date" v-model="medico.dataNascimento"
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

                <!--Horarios-->
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Horários de Atendimento <span
                            class="text-red-800">*</span></label>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <label v-for="horario in horariosAtendimento" :key="horario"
                            class="flex items-center cursor-pointer">
                            <!-- Checkbox -->
                            <input type="checkbox" :value="horario" v-model="medico.horarios" class="hidden peer">
                            <!-- Ícone do checkbox customizado -->
                            <div
                                class="w-5 h-5 border-2 border-gray-400 rounded-md peer-checked:bg-green-600 peer-checked:border-green-600 flex items-center justify-center transition">
                                <i class="fa-solid fa-check text-white text-xs"
                                    v-if="medico.horarios.includes(horario)"></i>
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
                        <input type="text" v-model="medico.valorConsulta" placeholder="Valor da Consulta"
                            class="input-field input-half rounded-l-none border border-gray-300 px-4 py-2 h-10 focus:ring-2 focus:ring-green-500 focus:outline-none w-full">
                    </div>
                </div>

                <!-- Foto de Perfil -->
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil <span
                            class="text-red-800">*</span></label>
                    <div class="flex items-center space-x-4">
                        <!-- Círculo para a Imagem de Perfil -->
                        <div v-if="medico.imagem"
                            class="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden">
                            <img :src="previewImagem || require('@/assets/imgs/user-default.jpg')" />
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
import axios from 'axios';
import { Options, Vue } from 'vue-class-component';
import { mask } from 'vue-the-mask'

@Options({
    components: {
    },

    directives: {
        mask
    }
})
export default class AlterarDadosMedico extends Vue {
    medico = {
        nome: '',
        sobrenome: '',
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
        'Oncologia', 'Pneumologia', 'Pediatria', 'Psiquiatria', 'Reumatologia'
    ]

    horariosAtendimento = [
        '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00',
        '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
        '16:00 - 17:00', '17:00 - 18:00', '22:00 - 23:00'
    ]

    //preview da imagem
    previewImagem = ''

    // Alerta
    mensagem_alerta: { icone: string, mensagem: string, status: 'sucesso' | 'erro' } | null = null

    //obter dados do medico
    mounted() {
        const email = localStorage.getItem('medicoEmail');
        if (email) {
            axios.get(`http://localhost/Projetos/tcc_unit/backend/api/perfil_medico.php?email=${email}`)
                .then(response => {
                    if (response.data.success) {
                        const medico = response.data.medico

                        if (typeof medico.horarios === 'string') {
                            try {
                                medico.horarios = JSON.parse(medico.horarios)
                            } catch {
                                medico.horarios = []
                            }
                        }

                        // Garante imagem com prefixo correto
                        if (medico.imagem) {
                            const imgLimpa = medico.imagem.replace(/^data:image\/[a-z]+;base64,/, '')
                            this.previewImagem = `data:image/jpeg;base64,${imgLimpa}`
                        } else {
                            this.previewImagem = ''
                        }

                        this.medico = medico
                    } else {
                        console.warn(response.data.message)
                    }
                })
                .catch(err => {
                    console.error('Erro ao buscar dados do médico:', err)
                })
        }
    }

    //salvar alteracoes
    async salvarAlteracoes() {
        try {
            const medicoParaSalvar = { ...this.medico }

            // Trata a imagem: remove prefixo se necessário
            if (this.previewImagem) {
                medicoParaSalvar.imagem = this.previewImagem.split(',')[1]
            } else if (this.medico.imagem?.startsWith('data:image/')) {
                medicoParaSalvar.imagem = this.medico.imagem.split(',')[1]
            }

            const response = await axios.post(
                'http://localhost/Projetos/tcc_unit/backend/api/atualizar_medico.php',
                medicoParaSalvar
            )

            if (response.data.success) {
                this.mostrarMensagemAlerta('fa-solid fa-check', 'Dados atualizados com sucesso!', 'sucesso')
            } else {
                this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', response.data.message, 'erro')
            }
        } catch (error) {
            console.error('Erro ao salvar alterações:', error)
            this.mostrarMensagemAlerta('fa-solid fa-circle-xmark', 'Erro ao salvar alterações.', 'erro')
        }
    }

    // Upload de Imagem e Atualização do Preview
    public uploadImagem(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
            const reader = new FileReader()

            reader.onload = () => {
                const result = reader.result as string

                // Remove prefixo caso já tenha
                const base64Limpo = result.replace(/^data:image\/[a-z]+;base64,/, '')

                // Define o preview com prefixo correto
                this.previewImagem = `data:image/jpeg;base64,${base64Limpo}`

                // Envio ao backend: apenas o base64 puro
                this.medico.imagem = base64Limpo
            }

            reader.readAsDataURL(file)
        }
    }

    //voltar ao menu inicial
    public voltarMenuInicial() {
        this.$router.push('/menu-medico')
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

<style lang="scss">
@import '../scss/forms.scss';
</style>
