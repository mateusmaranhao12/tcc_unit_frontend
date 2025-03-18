<template>
    <NavbarMedico />
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <button class="back-menu" @click="voltarMenuInicial"><i class="fa-solid fa-chevron-left"></i> Voltar ao menu inicial</button>
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Editar perfil</h2>

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
                        <input :type="senhaVisivel ? 'text' : 'password'" v-model="medico.senha"
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
                        <img :src="medico.imagem" alt="Foto de Perfil"
                            class="w-16 h-16 rounded-full border-2 border-gray-300 object-cover" />

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
import NavbarMedico from '@/components/NavbarMedico.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {
        NavbarMedico
    }
})
export default class AlterarDadosMedico extends Vue {
    medico = {
        nome: 'Mateus',
        sobrenome: 'Maranhão',
        email: 'mateusnmaranhao@gmail.com',
        senha: '12345',
        dataNascimento: '2003-05-27',
        genero: 'Masculino',
        crm: '123456',
        especialidade: 'Cardiologia',
        telefone: '(79) 99176-2846',
        cpf: '093.703.165-82',
        endereco: 'Rua 6',
        horarios: ['07:00 - 08:00', '14:00 - 15:00'],
        valorConsulta: '150,00',
        imagem: require('@/assets/imgs/user1.png')
    }

    especialidades = [
        'Alergologia', 'Ortopedia', 'Cardiologia', 'Dermatologia', 'Gastroenterologia',
        'Geriatria', 'Hematologia', 'Infectologia', 'Nefrologia', 'Neurologia',
        'Oncologia', 'Pneumologia', 'Reumatologia', 'Pediatria'
    ]

    horariosAtendimento = [
        '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00',
        '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
        '16:00 - 17:00', '17:00 - 18:00'
    ]

    senhaVisivel = false

    toggleSenha() {
        this.senhaVisivel = !this.senhaVisivel
    }

    //salvar alteracoes
    salvarAlteracoes() {
        console.log("Alterações salvas:", this.medico)
    }

    // Upload de Imagem e Atualização do Preview
    public uploadImagem(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.medico.imagem = URL.createObjectURL(file);
        }
    }

    //voltar ao menu inicial
    public voltarMenuInicial() {
        this.$router.push('/menu-medico')
    }
}
</script>

<style lang="scss">
@import '../scss/forms.scss';
</style>
