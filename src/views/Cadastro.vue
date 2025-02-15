<template>
    <NavbarIndex />
    <div class="card-form container mx-auto mt-8 mb-8">
        <h1 class="text-3xl font-bold text-center">Cadastro</h1>

        <!-- Botões para selecionar tipo de usuário -->
        <div class="flex justify-center space-x-4 mt-6">
            <button @click="tipoUsuario = 'paciente'" :class="{ 'active': tipoUsuario === 'paciente' }"
                class="btn-toggle">Paciente</button>
            <button @click="tipoUsuario = 'medico'" :class="{ 'active': tipoUsuario === 'medico' }"
                class="btn-toggle">Médico</button>
        </div>

        <!-- Formulário Paciente -->
        <form v-if="tipoUsuario === 'paciente'" class="form-cadastro grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <input type="text" v-model="paciente.nome" placeholder="Nome Completo" class="input-field col-span-2"
                required>
            <input type="email" v-model="paciente.email" placeholder="E-mail" class="input-field" required>
            <input type="password" v-model="paciente.senha" placeholder="Senha" class="input-field" required>
            <input type="date" v-model="paciente.dataNascimento" placeholder="Data de Nascimento" class="input-field"
                required>
            <input type="text" v-model="paciente.cpf" placeholder="CPF" class="input-field" required>
            <input type="text" v-model="paciente.telefone" placeholder="Telefone" class="input-field" required>
            <input type="text" v-model="paciente.endereco" placeholder="Endereço" class="input-field col-span-2"
                required>
            <select v-model="paciente.genero" class="input-field" required>
                <option value="">Selecione o Gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
            </select>
            <input type="text" v-model="paciente.convenio" placeholder="Convênio ou Particular" class="input-field"
                required>
            <textarea v-model="paciente.historico" placeholder="Histórico Médico"
                class="input-field col-span-2"></textarea>
            <input type="file" @change="uploadImagem($event, 'paciente')" accept="image/*"
                class="input-field col-span-2">
            <div class="flex justify-end col-span-2">
                <button type="submit" class="btn-submit">Cadastrar</button>
            </div>
        </form>

        <!-- Formulário Médico -->
        <form v-if="tipoUsuario === 'medico'" class="form-cadastro grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <input type="text" v-model="medico.nome" placeholder="Nome Completo" class="input-field col-span-2"
                required>
            <input type="email" v-model="medico.email" placeholder="E-mail" class="input-field" required>
            <input type="password" v-model="medico.senha" placeholder="Senha" class="input-field" required>
            <select v-model="medico.genero" class="input-field" required>
                <option value="">Selecione o Gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
            </select>
            <input type="text" v-model="medico.crm" placeholder="CRM" class="input-field" required>
            <select v-model="medico.especialidade" class="input-field" required>
                <option value="">Selecione a Especialidade</option>
                <option v-for="esp in especialidades" :key="esp" :value="esp">{{ esp }}</option>
            </select>
            <input type="text" v-model="medico.telefone" placeholder="Telefone" class="input-field" required>
            <input type="text" v-model="medico.cpf" placeholder="CPF" class="input-field" required>
            <input type="text" v-model="medico.endereco" placeholder="Endereço do Consultório"
                class="input-field col-span-2" required>
            <input type="text" v-model="medico.horario" placeholder="Horário de Atendimento" class="input-field"
                required>
            <input type="text" v-model="medico.valorConsulta" placeholder="Valor da Consulta" class="input-field"
                required>
            <input type="file" @change="uploadImagem($event, 'medico')" accept="image/*" class="input-field col-span-2">
           
            <div class="flex justify-end col-span-2">
                <button type="submit" class="btn-submit">Cadastrar</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavbarIndex from '@/components/NavbarIndex.vue';

@Options({
    components: {
        NavbarIndex
    }
})
export default class Cadastro extends Vue {
    tipoUsuario = 'paciente';
    paciente = {
        nome: '',
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
    };
    medico = {
        nome: '',
        email: '',
        senha: '',
        genero: '',
        crm: '',
        especialidade: '',
        telefone: '',
        cpf: '',
        endereco: '',
        horario: '',
        valorConsulta: '',
        imagem: ''
    };
    especialidades = [
        'Alergologia', 'Ortopedia', 'Cardiologia', 'Dermatologia', 'Gastroenterologia',
        'Geriatria', 'Hematologia', 'Infectologia', 'Nefrologia', 'Neurologia',
        'Oncologia', 'Pneumologia', 'Reumatologia'
    ];

    uploadImagem(event: Event, tipo: string) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            if (tipo === 'paciente') {
                this.paciente.imagem = URL.createObjectURL(file);
            } else {
                this.medico.imagem = URL.createObjectURL(file);
            }
        }
    }
}
</script>

<style lang="scss">
@import '../scss/forms.scss';
</style>
